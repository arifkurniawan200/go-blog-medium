package entities

type Bookmark struct {
	ID     string `json:"id"`
	UserID string `json:"user_id"`
	PostID string `json:"post_id"`
}
