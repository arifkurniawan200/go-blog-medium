package dto

type FollowRequest struct {
	FollowingID string `json:"following_id" validate:"required"`
}

type ClapRequest struct {
	Count int `json:"count" validate:"required,min=1,max=50"`
}

type ClapResponse struct {
	PostID string `json:"post_id"`
	Total  int    `json:"total"`
}
