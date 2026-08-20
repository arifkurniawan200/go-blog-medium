package usecase

import (
	"context"
	"errors"

	"go-modular/internal/domain/entities"
	"go-modular/internal/domain/repositories"
)

var ErrCannotFollowSelf = errors.New("cannot follow yourself")
var ErrAlreadyFollowing  = errors.New("already following")
var ErrNotFollowing     = errors.New("not following")

type FollowUseCase struct {
	followRepo repositories.FollowRepository
	userRepo  repositories.UserRepository
}

func NewFollowUseCase(followRepo repositories.FollowRepository, userRepo repositories.UserRepository) *FollowUseCase {
	return &FollowUseCase{followRepo: followRepo, userRepo: userRepo}
}

func (uc *FollowUseCase) Follow(ctx context.Context, followerID, followingID string) error {
	if followerID == followingID {
		return ErrCannotFollowSelf
	}
	if _, err := uc.userRepo.GetByID(ctx, followingID); err != nil {
		return ErrUserNotFound
	}
	already, _ := uc.followRepo.IsFollowing(ctx, followerID, followingID)
	if already {
		return ErrAlreadyFollowing
	}
	return uc.followRepo.Follow(ctx, followerID, followingID)
}

func (uc *FollowUseCase) Unfollow(ctx context.Context, followerID, followingID string) error {
	already, _ := uc.followRepo.IsFollowing(ctx, followerID, followingID)
	if !already {
		return ErrNotFollowing
	}
	return uc.followRepo.Unfollow(ctx, followerID, followingID)
}

func (uc *FollowUseCase) GetFollowers(ctx context.Context, userID string, page, limit int) ([]*entities.User, int64, error) {
	offset := (page - 1) * limit
	return uc.followRepo.GetFollowers(ctx, userID, offset, limit)
}

func (uc *FollowUseCase) GetFollowing(ctx context.Context, userID string, page, limit int) ([]*entities.User, int64, error) {
	offset := (page - 1) * limit
	return uc.followRepo.GetFollowing(ctx, userID, offset, limit)
}

func (uc *FollowUseCase) GetFollowStats(ctx context.Context, userID string) (followers, following int, err error) {
	followers, _ = uc.followRepo.CountFollowers(ctx, userID)
	following, _ = uc.followRepo.CountFollowing(ctx, userID)
	return followers, following, nil
}
