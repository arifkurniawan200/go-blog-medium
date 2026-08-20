package repository

import (
	"context"
	"sync"
	"time"

	"go-modular/internal/domain/entities"
)

type MockTagRepository struct {
	mu   sync.RWMutex
	tags map[string]*entities.Tag
}

func NewMockTagRepository() *MockTagRepository {
	return &MockTagRepository{tags: make(map[string]*entities.Tag)}
}

func (r *MockTagRepository) Create(ctx context.Context, tag *entities.Tag) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	tag.ID = "tag-" + randomID()
	tag.CreatedAt = time.Now()
	r.tags[tag.ID] = tag
	return nil
}

func (r *MockTagRepository) GetByID(ctx context.Context, id string) (*entities.Tag, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	if t, ok := r.tags[id]; ok {
		return t, nil
	}
	return nil, entities.ErrNotFound
}

func (r *MockTagRepository) GetBySlug(ctx context.Context, slug string) (*entities.Tag, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	for _, t := range r.tags {
		if t.Slug == slug {
			return t, nil
		}
	}
	return nil, entities.ErrNotFound
}

func (r *MockTagRepository) GetOrCreate(ctx context.Context, name string) (*entities.Tag, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	for _, t := range r.tags {
		if t.Name == name {
			return t, nil
		}
	}
	tag := &entities.Tag{Name: name, Slug: slugify(name), PostCount: 0}
	tag.ID = "tag-" + randomID()
	tag.CreatedAt = time.Now()
	r.tags[tag.ID] = tag
	return tag, nil
}

func (r *MockTagRepository) List(ctx context.Context) ([]*entities.Tag, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	result := make([]*entities.Tag, 0, len(r.tags))
	for _, t := range r.tags {
		result = append(result, t)
	}
	return result, nil
}

func (r *MockTagRepository) AddToPost(ctx context.Context, postID, tagID string) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if t, ok := r.tags[tagID]; ok {
		t.PostCount++
	}
	return nil
}

func (r *MockTagRepository) GetByPostID(ctx context.Context, postID string) ([]*entities.Tag, error) {
	return []*entities.Tag{}, nil
}
