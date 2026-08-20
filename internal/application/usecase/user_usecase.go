package usecase

import (
	"context"
	"errors"

	"go-modular/internal/application/dto"
	"go-modular/internal/domain/entities"
	"go-modular/internal/domain/repositories"
)

var (
	ErrEmailTaken    = errors.New("email already taken")
	ErrUserNotFound  = errors.New("user not found")
)

type UserUseCase struct {
	repo repositories.UserRepository
}

func NewUserUseCase(repo repositories.UserRepository) *UserUseCase {
	return &UserUseCase{repo: repo}
}

func (uc *UserUseCase) Create(ctx context.Context, req dto.CreateUserRequest) (*dto.UserResponse, error) {
	existing, _ := uc.repo.GetByEmail(ctx, req.Email)
	if existing != nil {
		return nil, ErrEmailTaken
	}

	user := &entities.User{
		Email:    req.Email,
		Name:     req.Name,
		Password: hashPassword(req.Password),
		Role:     req.Role,
	}
	if user.Role == "" {
		user.Role = "user"
	}

	if err := user.Validate(); err != nil {
		return nil, err
	}

	if err := uc.repo.Create(ctx, user); err != nil {
		return nil, err
	}

	return &dto.UserResponse{
		ID:    user.ID,
		Email: user.Email,
		Name:  user.Name,
		Role:  user.Role,
	}, nil
}

func (uc *UserUseCase) GetByID(ctx context.Context, id string) (*dto.UserResponse, error) {
	user, err := uc.repo.GetByID(ctx, id)
	if err != nil {
		return nil, ErrUserNotFound
	}
	resp := dto.ToUserResponse(user)
	return &resp, nil
}

func (uc *UserUseCase) List(ctx context.Context, page, limit int) ([]*dto.UserResponse, int64, error) {
	offset := (page - 1) * limit
	users, total, err := uc.repo.List(ctx, offset, limit)
	if err != nil {
		return nil, 0, err
	}
	result := make([]*dto.UserResponse, len(users))
	for i, u := range users {
		resp := dto.ToUserResponse(u)
		result[i] = &resp
	}
	return result, total, nil
}

func (uc *UserUseCase) Update(ctx context.Context, id string, req dto.UpdateUserRequest) (*dto.UserResponse, error) {
	user, err := uc.repo.GetByID(ctx, id)
	if err != nil {
		return nil, ErrUserNotFound
	}
	if req.Name != nil {
		user.Name = *req.Name
	}
	if req.Bio != nil {
		user.Bio = *req.Bio
	}
	if req.AvatarURL != nil {
		user.AvatarURL = *req.AvatarURL
	}
	if err := uc.repo.Update(ctx, user); err != nil {
		return nil, err
	}
	resp := dto.ToUserResponse(user)
	return &resp, nil
}

func (uc *UserUseCase) Delete(ctx context.Context, id string) error {
	if _, err := uc.repo.GetByID(ctx, id); err != nil {
		return ErrUserNotFound
	}
	return uc.repo.Delete(ctx, id)
}

func hashPassword(pwd string) string {
	return pwd
}
