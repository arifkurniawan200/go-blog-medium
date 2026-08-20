package repository

import (
	"context"
	"sync"
	"time"

	"go-modular/internal/domain/entities"
)

type MockUserRepository struct {
	mu    sync.RWMutex
	users map[string]*entities.User
}

func NewMockUserRepository() *MockUserRepository {
	return &MockUserRepository{users: make(map[string]*entities.User)}
}

func (r *MockUserRepository) Create(ctx context.Context, user *entities.User) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	user.ID = "user-" + randomID()
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()
	r.users[user.ID] = user
	return nil
}

func (r *MockUserRepository) GetByID(ctx context.Context, id string) (*entities.User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	if u, ok := r.users[id]; ok {
		return u, nil
	}
	return nil, entities.ErrNotFound
}

func (r *MockUserRepository) GetByEmail(ctx context.Context, email string) (*entities.User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	for _, u := range r.users {
		if u.Email == email {
			return u, nil
		}
	}
	return nil, nil
}

func (r *MockUserRepository) Update(ctx context.Context, user *entities.User) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	user.UpdatedAt = time.Now()
	r.users[user.ID] = user
	return nil
}

func (r *MockUserRepository) Delete(ctx context.Context, id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	delete(r.users, id)
	return nil
}

func (r *MockUserRepository) List(ctx context.Context, offset, limit int) ([]*entities.User, int64, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	all := make([]*entities.User, 0, len(r.users))
	for _, u := range r.users {
		all = append(all, u)
	}
	if offset >= len(all) {
		return []*entities.User{}, int64(len(all)), nil
	}
	end := offset + limit
	if end > len(all) {
		end = len(all)
	}
	return all[offset:end], int64(len(all)), nil
}
