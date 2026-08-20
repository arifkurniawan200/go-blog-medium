package repository

import (
	"context"
	"sync"

	"go-modular/internal/domain/entities"
)

type MockBookmarkRepository struct {
	mu        sync.RWMutex
	bookmarks map[string]*entities.Bookmark
}

func NewMockBookmarkRepository() *MockBookmarkRepository {
	return &MockBookmarkRepository{bookmarks: make(map[string]*entities.Bookmark)}
}

func (r *MockBookmarkRepository) key(u, p string) string { return u + "|" + p }

func (r *MockBookmarkRepository) Create(ctx context.Context, bookmark *entities.Bookmark) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	bookmark.ID = "bm-" + randomID()
	r.bookmarks[r.key(bookmark.UserID, bookmark.PostID)] = bookmark
	return nil
}

func (r *MockBookmarkRepository) Delete(ctx context.Context, userID, postID string) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	delete(r.bookmarks, r.key(userID, postID))
	return nil
}

func (r *MockBookmarkRepository) GetByUser(ctx context.Context, userID string, offset, limit int) ([]*entities.Post, int64, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	var posts []*entities.Post
	for _, b := range r.bookmarks {
		if b.UserID == userID {
			posts = append(posts, &entities.Post{ID: b.PostID, Title: "Post " + b.PostID})
		}
	}
	if offset >= len(posts) {
		return []*entities.Post{}, int64(len(posts)), nil
	}
	end := offset + limit
	if end > len(posts) { end = len(posts) }
	return posts[offset:end], int64(len(posts)), nil
}

func (r *MockBookmarkRepository) IsBookmarked(ctx context.Context, userID, postID string) (bool, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	_, ok := r.bookmarks[r.key(userID, postID)]
	return ok, nil
}
