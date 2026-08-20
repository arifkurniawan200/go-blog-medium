package entities

import (
	"errors"
	"time"
)

var (
	ErrInvalidEmail = errors.New("invalid email")
	ErrInvalidName  = errors.New("name cannot be empty")
	ErrNotFound     = errors.New("entity not found")
)

type User struct {
	ID        string    `json:"id"`
	Email     string    `json:"email"`
	Name      string    `json:"name"`
	Password  string    `json:"-"`
	Role      string    `json:"role"`
	Bio       string    `json:"bio,omitempty"`
	AvatarURL string    `json:"avatar_url,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (u *User) IsAdmin() bool { return u.Role == "admin" }

func (u *User) Validate() error {
	if u.Email == "" {
		return ErrInvalidEmail
	}
	if u.Name == "" {
		return ErrInvalidName
	}
	return nil
}
