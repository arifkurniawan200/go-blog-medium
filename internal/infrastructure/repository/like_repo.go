package repository

import (
	"context"
	"sync"

	"go-modular/internal/domain/entities"
)

type MockLikeRepository struct {
	mu      sync.RWMutex
	likes   map[string]bool
	counts  map[string]int
}

func NewMockLikeRepository() *MockLikeRepository {
	return &MockLikeRepository{
		likes:  make(map[string]bool),
		counts: make(map[string]int),
	}
}

func (r *MockLikeRepository) key(u, p string) string { return u + "|" + p }

func (r *MockLikeRepository) Create(ctx context.Context, like *entities.Like) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	k := r.key(like.UserID, like.PostID)
	if !r.likes[k] {
		r.likes[k] = true
		r.counts[like.PostID]++
	}
	return nil
}

func (r *MockLikeRepository) Delete(ctx context.Context, userID, postID string) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	k := r.key(userID, postID)
	if r.likes[k] {
		r.likes[k] = false
		r.counts[postID]--
	}
	return nil
}

func (r *MockLikeRepository) CountByPost(ctx context.Context, postID string) (int, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	if c, ok := r.counts[postID]; ok {
		return c, nil
	}
	return 0, nil
}

func (r *MockLikeRepository) IsLiked(ctx context.Context, userID, postID string) (bool, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.likes[r.key(userID, postID)], nil
}
