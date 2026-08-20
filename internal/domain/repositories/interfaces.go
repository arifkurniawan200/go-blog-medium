package repositories

import (
	"context"

	"go-modular/internal/domain/entities"
)

type UserRepository interface {
	Create(ctx context.Context, user *entities.User) error
	GetByID(ctx context.Context, id string) (*entities.User, error)
	GetByEmail(ctx context.Context, email string) (*entities.User, error)
	Update(ctx context.Context, user *entities.User) error
	Delete(ctx context.Context, id string) error
	List(ctx context.Context, offset, limit int) ([]*entities.User, int64, error)
}

type PostRepository interface {
	Create(ctx context.Context, post *entities.Post) error
	GetByID(ctx context.Context, id string) (*entities.Post, error)
	GetBySlug(ctx context.Context, slug string) (*entities.Post, error)
	Update(ctx context.Context, post *entities.Post) error
	Delete(ctx context.Context, id string) error
	List(ctx context.Context, offset, limit int, status string) ([]*entities.Post, int64, error)
	ListByAuthor(ctx context.Context, authorID string, offset, limit int) ([]*entities.Post, int64, error)
	IncrementView(ctx context.Context, id string) error
}

type CommentRepository interface {
	Create(ctx context.Context, comment *entities.Comment) error
	GetByID(ctx context.Context, id string) (*entities.Comment, error)
	GetByPostID(ctx context.Context, postID string, offset, limit int) ([]*entities.Comment, int64, error)
	Delete(ctx context.Context, id string) error
}

type TagRepository interface {
	Create(ctx context.Context, tag *entities.Tag) error
	GetByID(ctx context.Context, id string) (*entities.Tag, error)
	GetBySlug(ctx context.Context, slug string) (*entities.Tag, error)
	GetOrCreate(ctx context.Context, name string) (*entities.Tag, error)
	List(ctx context.Context) ([]*entities.Tag, error)
	AddToPost(ctx context.Context, postID, tagID string) error
	GetByPostID(ctx context.Context, postID string) ([]*entities.Tag, error)
}

type FollowRepository interface {
	Follow(ctx context.Context, followerID, followingID string) error
	Unfollow(ctx context.Context, followerID, followingID string) error
	IsFollowing(ctx context.Context, followerID, followingID string) (bool, error)
	GetFollowers(ctx context.Context, userID string, offset, limit int) ([]*entities.User, int64, error)
	GetFollowing(ctx context.Context, userID string, offset, limit int) ([]*entities.User, int64, error)
	CountFollowers(ctx context.Context, userID string) (int, error)
	CountFollowing(ctx context.Context, userID string) (int, error)
}

type BookmarkRepository interface {
	Create(ctx context.Context, bookmark *entities.Bookmark) error
	Delete(ctx context.Context, userID, postID string) error
	GetByUser(ctx context.Context, userID string, offset, limit int) ([]*entities.Post, int64, error)
	IsBookmarked(ctx context.Context, userID, postID string) (bool, error)
}

type LikeRepository interface {
	Create(ctx context.Context, like *entities.Like) error
	Delete(ctx context.Context, userID, postID string) error
	CountByPost(ctx context.Context, postID string) (int, error)
	IsLiked(ctx context.Context, userID, postID string) (bool, error)
}
