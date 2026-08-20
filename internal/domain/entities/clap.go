package entities

type Clap struct {
	ID     string `json:"id"`
	UserID string `json:"user_id"`
	PostID string `json:"post_id"`
	Count  int    `json:"count"`
}
