package usecase

import (
	"context"
	"errors"
	"regexp"
	"strings"
	"time"
	"unicode/utf8"

	"go-modular/internal/application/dto"
	"go-modular/internal/domain/entities"
	"go-modular/internal/domain/repositories"
)

var (
	ErrPostNotFound = errors.New("post not found")
	ErrSlugTaken    = errors.New("slug already taken")
)

type PostUseCase struct {
	repo     repositories.PostRepository
	tagRepo  repositories.TagRepository
	userRepo repositories.UserRepository
}

func NewPostUseCase(repo repositories.PostRepository, tagRepo repositories.TagRepository, userRepo repositories.UserRepository) *PostUseCase {
	return &PostUseCase{repo: repo, tagRepo: tagRepo, userRepo: userRepo}
}

func (uc *PostUseCase) Create(ctx context.Context, authorID string, req dto.CreatePostRequest) (*dto.PostResponse, error) {
	if err := validateCreatePost(req); err != nil {
		return nil, err
	}

	slug := generateSlug(req.Title)

	post := &entities.Post{
		AuthorID: authorID,
		Title:    req.Title,
		Slug:     slug,
		Content:  req.Content,
		Excerpt:  req.Excerpt,
		CoverURL: req.CoverURL,
		Status:   "draft",
		Tags:     req.Tags,
		ReadTime: calculateReadTime(req.Content),
	}

	if err := uc.repo.Create(ctx, post); err != nil {
		return nil, err
	}

	for _, tagName := range req.Tags {
		tag, _ := uc.tagRepo.GetOrCreate(ctx, tagName)
		if tag != nil {
			uc.tagRepo.AddToPost(ctx, post.ID, tag.ID)
		}
	}

	resp := dto.ToPostResponse(post)
	return &resp, nil
}

func (uc *PostUseCase) GetByID(ctx context.Context, id string) (*dto.PostResponse, error) {
	post, err := uc.repo.GetByID(ctx, id)
	if err != nil {
		return nil, ErrPostNotFound
	}
	uc.repo.IncrementView(ctx, id)
	tags, _ := uc.tagRepo.GetByPostID(ctx, id)
	tagNames := make([]string, len(tags))
	for i, t := range tags {
		tagNames[i] = t.Name
	}
	post.Tags = tagNames
	resp := dto.ToPostResponse(post)
	return &resp, nil
}

func (uc *PostUseCase) GetBySlug(ctx context.Context, slug string) (*dto.PostResponse, error) {
	post, err := uc.repo.GetBySlug(ctx, slug)
	if err != nil {
		return nil, ErrPostNotFound
	}
	uc.repo.IncrementView(ctx, post.ID)
	tags, _ := uc.tagRepo.GetByPostID(ctx, post.ID)
	tagNames := make([]string, len(tags))
	for i, t := range tags {
		tagNames[i] = t.Name
	}
	post.Tags = tagNames
	resp := dto.ToPostResponse(post)
	return &resp, nil
}

func (uc *PostUseCase) List(ctx context.Context, page, limit int, status string) ([]*dto.PostResponse, int64, error) {
	offset := (page - 1) * limit
	posts, total, err := uc.repo.List(ctx, offset, limit, status)
	if err != nil {
		return nil, 0, err
	}
	result := make([]*dto.PostResponse, len(posts))
	for i, p := range posts {
		resp := dto.ToPostResponse(p)
		result[i] = &resp
	}
	return result, total, nil
}

func (uc *PostUseCase) Update(ctx context.Context, id string, req dto.UpdatePostRequest) (*dto.PostResponse, error) {
	post, err := uc.repo.GetByID(ctx, id)
	if err != nil {
		return nil, ErrPostNotFound
	}
	if req.Title != nil {
		post.Title = *req.Title
		post.Slug = generateSlug(*req.Title)
	}
	if req.Content != nil {
		post.Content = *req.Content
		post.ReadTime = calculateReadTime(*req.Content)
	}
	if req.Excerpt != nil {
		post.Excerpt = *req.Excerpt
	}
	if req.CoverURL != nil {
		post.CoverURL = *req.CoverURL
	}
	if req.Status != nil {
		post.Status = *req.Status
		if *req.Status == "published" {
			now := time.Now()
			post.PublishedAt = &now
		}
	}
	if req.Tags != nil {
		post.Tags = req.Tags
	}

	if err := uc.repo.Update(ctx, post); err != nil {
		return nil, err
	}
	resp := dto.ToPostResponse(post)
	return &resp, nil
}

func (uc *PostUseCase) Delete(ctx context.Context, id string) error {
	if _, err := uc.repo.GetByID(ctx, id); err != nil {
		return ErrPostNotFound
	}
	return uc.repo.Delete(ctx, id)
}

func validateCreatePost(req dto.CreatePostRequest) error {
	if strings.TrimSpace(req.Title) == "" {
		return errors.New("title is required")
	}
	return nil
}

func generateSlug(title string) string {
	slug := strings.ToLower(title)
	reg := regexp.MustCompile(`[^a-z0-9]+`)
	slug = reg.ReplaceAllString(slug, "-")
	slug = strings.Trim(slug, "-")
	return slug + "-" + randomString(6)
}

func calculateReadTime(content string) int {
	words := utf8.RuneCountInString(content)
	minutes := words / 200
	if minutes < 1 {
		minutes = 1
	}
	return minutes
}

func randomString(n int) string {
	const letters = "abcdefghijklmnopqrstuvwxyz0123456789"
	b := make([]byte, n)
	for i := range b {
		b[i] = letters[i%len(letters)]
	}
	return string(b)
}
