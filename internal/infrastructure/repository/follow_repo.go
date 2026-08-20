package repository

import (
	"context"
	"sync"

	"go-modular/internal/domain/entities"
)

type MockFollowRepository struct {
	mu       sync.RWMutex
	follows  map[string]bool
	followerIndex map[string][]string
	followingIndex map[string][]string
}

func NewMockFollowRepository() *MockFollowRepository {
	return &MockFollowRepository{
		follows:         make(map[string]bool),
		followerIndex:  make(map[string][]string),
		followingIndex: make(map[string][]string),
	}
}

func (r *MockFollowRepository) key(a, b string) string { return a + "|" + b }

func (r *MockFollowRepository) Follow(ctx context.Context, followerID, followingID string) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	k := r.key(followerID, followingID)
	r.follows[k] = true
	r.followerIndex[followingID] = append(r.followerIndex[followingID], followerID)
	r.followingIndex[followerID] = append(r.followingIndex[followerID], followingID)
	return nil
}

func (r *MockFollowRepository) Unfollow(ctx context.Context, followerID, followingID string) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	delete(r.follows, r.key(followerID, followingID))
	return nil
}

func (r *MockFollowRepository) IsFollowing(ctx context.Context, followerID, followingID string) (bool, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.follows[r.key(followerID, followingID)], nil
}

func (r *MockFollowRepository) GetFollowers(ctx context.Context, userID string, offset, limit int) ([]*entities.User, int64, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	ids := r.followerIndex[userID]
	if offset >= len(ids) {
		return []*entities.User{}, int64(len(ids)), nil
	}
	end := offset + limit
	if end > len(ids) { end = len(ids) }
	users := make([]*entities.User, end-offset)
	for i := offset; i < end; i++ {
		users[i-offset] = &entities.User{ID: ids[i], Name: "User " + ids[i]}
	}
	return users, int64(len(ids)), nil
}

func (r *MockFollowRepository) GetFollowing(ctx context.Context, userID string, offset, limit int) ([]*entities.User, int64, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	ids := r.followingIndex[userID]
	if offset >= len(ids) {
		return []*entities.User{}, int64(len(ids)), nil
	}
	end := offset + limit
	if end > len(ids) { end = len(ids) }
	users := make([]*entities.User, end-offset)
	for i := offset; i < end; i++ {
		users[i-offset] = &entities.User{ID: ids[i], Name: "User " + ids[i]}
	}
	return users, int64(len(ids)), nil
}

func (r *MockFollowRepository) CountFollowers(ctx context.Context, userID string) (int, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return len(r.followerIndex[userID]), nil
}

func (r *MockFollowRepository) CountFollowing(ctx context.Context, userID string) (int, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return len(r.followingIndex[userID]), nil
}
