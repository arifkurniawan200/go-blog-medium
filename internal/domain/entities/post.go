package entities

import (
	"errors"
	"time"
)

var ErrEmptyTitle = errors.New("title cannot be empty")

type Post struct {
	ID           string     `json:"id"`
	AuthorID     string     `json:"author_id"`
	Title        string     `json:"title"`
	Slug         string     `json:"slug"`
	Content      string     `json:"content"`
	Excerpt      string     `json:"excerpt,omitempty"`
	CoverURL     string     `json:"cover_url,omitempty"`
	Status       string     `json:"status"`
	Tags         []string   `json:"tags,omitempty"`
	ViewCount    int        `json:"view_count"`
	ReadTime     int        `json:"read_time"`
	PublishedAt  *time.Time `json:"published_at,omitempty"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
}

func (p *Post) IsPublished() bool { return p.Status == "published" }

func (p *Post) Validate() error {
	if p.Title == "" {
		return ErrEmptyTitle
	}
	return nil
}
