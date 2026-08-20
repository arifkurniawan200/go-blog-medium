package usecase

import (
	"context"

	"go-modular/internal/domain/entities"
	"go-modular/internal/domain/repositories"
)

type InteractionUseCase struct {
	likeRepo repositories.LikeRepository
	postRepo repositories.PostRepository
}

func NewInteractionUseCase(likeRepo repositories.LikeRepository, postRepo repositories.PostRepository) *InteractionUseCase {
	return &InteractionUseCase{likeRepo: likeRepo, postRepo: postRepo}
}

func (uc *InteractionUseCase) Like(ctx context.Context, userID, postID string) error {
	if _, err := uc.postRepo.GetByID(ctx, postID); err != nil {
		return ErrPostNotFound
	}
	like := &entities.Like{UserID: userID, PostID: postID}
	return uc.likeRepo.Create(ctx, like)
}

func (uc *InteractionUseCase) Unlike(ctx context.Context, userID, postID string) error {
	return uc.likeRepo.Delete(ctx, userID, postID)
}

func (uc *InteractionUseCase) GetLikeCount(ctx context.Context, postID string) (int, error) {
	return uc.likeRepo.CountByPost(ctx, postID)
}

func (uc *InteractionUseCase) IsLiked(ctx context.Context, userID, postID string) (bool, error) {
	return uc.likeRepo.IsLiked(ctx, userID, postID)
}
