package handler

import (
	"net/http"
	"strconv"

	"go-modular/internal/application/usecase"
	"go-modular/pkg/pager"
	"go-modular/pkg/response"
)

type FollowHandler struct {
	uc *usecase.FollowUseCase
}

func NewFollowHandler(uc *usecase.FollowUseCase) *FollowHandler {
	return &FollowHandler{uc: uc}
}

func (h *FollowHandler) Follow(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	followingID := r.PathValue("id")
	if err := h.uc.Follow(r.Context(), userID, followingID); err != nil {
		response.Error(w, http.StatusBadRequest, "FOLLOW_FAILED", err.Error())
		return
	}
	response.Success(w, http.StatusOK, map[string]string{"status": "following"})
}

func (h *FollowHandler) Unfollow(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	followingID := r.PathValue("id")
	if err := h.uc.Unfollow(r.Context(), userID, followingID); err != nil {
		response.Error(w, http.StatusBadRequest, "UNFOLLOW_FAILED", err.Error())
		return
	}
	response.Success(w, http.StatusOK, map[string]string{"status": "unfollowed"})
}

func (h *FollowHandler) GetFollowers(w http.ResponseWriter, r *http.Request) {
	userID := r.PathValue("id")
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	p := pager.New(page, limit)
	users, total, err := h.uc.GetFollowers(r.Context(), userID, p.Page, p.Limit)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "FAILED", err.Error())
		return
	}
	result := make([]interface{}, len(users))
	for i, u := range users {
		result[i] = u
	}
	response.Paginated(w, http.StatusOK, result, p.Page, p.Limit, total)
}

func (h *FollowHandler) GetFollowing(w http.ResponseWriter, r *http.Request) {
	userID := r.PathValue("id")
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	p := pager.New(page, limit)
	users, total, err := h.uc.GetFollowing(r.Context(), userID, p.Page, p.Limit)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "FAILED", err.Error())
		return
	}
	result := make([]interface{}, len(users))
	for i, u := range users {
		result[i] = u
	}
	response.Paginated(w, http.StatusOK, result, p.Page, p.Limit, total)
}

func (h *FollowHandler) GetMyFollowing(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	p := pager.New(page, limit)
	users, total, err := h.uc.GetFollowing(r.Context(), userID, p.Page, p.Limit)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "FAILED", err.Error())
		return
	}
	result := make([]interface{}, len(users))
	for i, u := range users {
		result[i] = u
	}
	response.Paginated(w, http.StatusOK, result, p.Page, p.Limit, total)
}
