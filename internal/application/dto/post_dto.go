package dto

import "go-modular/internal/domain/entities"

type CreatePostRequest struct {
	Title    string   `json:"title" validate:"required"`
	Content  string   `json:"content" validate:"required"`
	Excerpt  string   `json:"excerpt,omitempty"`
	CoverURL string   `json:"cover_url,omitempty"`
	Tags     []string `json:"tags,omitempty"`
}

type UpdatePostRequest struct {
	Title    *string  `json:"title,omitempty"`
	Content  *string  `json:"content,omitempty"`
	Excerpt  *string  `json:"excerpt,omitempty"`
	CoverURL *string  `json:"cover_url,omitempty"`
	Status   *string  `json:"status,omitempty"`
	Tags     []string `json:"tags,omitempty"`
}

type PostResponse struct {
	ID        string   `json:"id"`
	AuthorID  string   `json:"author_id"`
	Title     string   `json:"title"`
	Slug      string   `json:"slug"`
	Content   string   `json:"content"`
	Excerpt   string   `json:"excerpt,omitempty"`
	CoverURL  string   `json:"cover_url,omitempty"`
	Status    string   `json:"status"`
	Tags      []string `json:"tags,omitempty"`
	ViewCount int      `json:"view_count"`
	ReadTime  int      `json:"read_time"`
}

func ToPostResponse(p *entities.Post) PostResponse {
	return PostResponse{
		ID:        p.ID,
		AuthorID:  p.AuthorID,
		Title:     p.Title,
		Slug:      p.Slug,
		Content:   p.Content,
		Excerpt:   p.Excerpt,
		CoverURL:  p.CoverURL,
		Status:    p.Status,
		Tags:      p.Tags,
		ViewCount: p.ViewCount,
		ReadTime:  p.ReadTime,
	}
}
