package entities

type Comment struct {
	ID       string  `json:"id"`
	PostID   string  `json:"post_id"`
	UserID   string  `json:"user_id"`
	ParentID *string `json:"parent_id,omitempty"`
	Content  string  `json:"content"`
}
