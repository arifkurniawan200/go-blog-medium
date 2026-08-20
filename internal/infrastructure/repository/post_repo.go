package repository

import (
	"context"
	"sync"
	"time"

	"go-modular/internal/domain/entities"
)

type MockPostRepository struct {
	mu    sync.RWMutex
	posts map[string]*entities.Post
}

func NewMockPostRepository() *MockPostRepository {
	return &MockPostRepository{posts: make(map[string]*entities.Post)}
}

func (r *MockPostRepository) Create(ctx context.Context, post *entities.Post) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	post.ID = "post-" + randomID()
	post.CreatedAt = time.Now()
	post.UpdatedAt = time.Now()
	r.posts[post.ID] = post
	return nil
}

func (r *MockPostRepository) GetByID(ctx context.Context, id string) (*entities.Post, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	if p, ok := r.posts[id]; ok {
		return p, nil
	}
	return nil, entities.ErrNotFound
}

func (r *MockPostRepository) GetBySlug(ctx context.Context, slug string) (*entities.Post, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	for _, p := range r.posts {
		if p.Slug == slug {
			return p, nil
		}
	}
	return nil, entities.ErrNotFound
}

func (r *MockPostRepository) Update(ctx context.Context, post *entities.Post) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	post.UpdatedAt = time.Now()
	r.posts[post.ID] = post
	return nil
}

func (r *MockPostRepository) Delete(ctx context.Context, id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	delete(r.posts, id)
	return nil
}

func (r *MockPostRepository) List(ctx context.Context, offset, limit int, status string) ([]*entities.Post, int64, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	all := make([]*entities.Post, 0, len(r.posts))
	for _, p := range r.posts {
		if status == "" || p.Status == status {
			all = append(all, p)
		}
	}
	if offset >= len(all) {
		return []*entities.Post{}, int64(len(all)), nil
	}
	end := offset + limit
	if end > len(all) {
		end = len(all)
	}
	return all[offset:end], int64(len(all)), nil
}

func (r *MockPostRepository) ListByAuthor(ctx context.Context, authorID string, offset, limit int) ([]*entities.Post, int64, error) {
	return r.List(ctx, offset, limit, "")
}

func (r *MockPostRepository) IncrementView(ctx context.Context, id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if p, ok := r.posts[id]; ok {
		p.ViewCount++
	}
	return nil
}
