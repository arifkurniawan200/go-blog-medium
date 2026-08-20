package usecase

import (
	"context"

	"go-modular/internal/domain/entities"
	"go-modular/internal/domain/repositories"
)

type BookmarkUseCase struct {
	bookmarkRepo repositories.BookmarkRepository
	postRepo    repositories.PostRepository
}

func NewBookmarkUseCase(bookmarkRepo repositories.BookmarkRepository, postRepo repositories.PostRepository) *BookmarkUseCase {
	return &BookmarkUseCase{bookmarkRepo: bookmarkRepo, postRepo: postRepo}
}

func (uc *BookmarkUseCase) Bookmark(ctx context.Context, userID, postID string) error {
	if _, err := uc.postRepo.GetByID(ctx, postID); err != nil {
		return ErrPostNotFound
	}
	bookmark := &entities.Bookmark{UserID: userID, PostID: postID}
	return uc.bookmarkRepo.Create(ctx, bookmark)
}

func (uc *BookmarkUseCase) Unbookmark(ctx context.Context, userID, postID string) error {
	return uc.bookmarkRepo.Delete(ctx, userID, postID)
}

func (uc *BookmarkUseCase) GetUserBookmarks(ctx context.Context, userID string, page, limit int) ([]*entities.Post, int64, error) {
	offset := (page - 1) * limit
	return uc.bookmarkRepo.GetByUser(ctx, userID, offset, limit)
}

func (uc *BookmarkUseCase) IsBookmarked(ctx context.Context, userID, postID string) (bool, error) {
	return uc.bookmarkRepo.IsBookmarked(ctx, userID, postID)
}
