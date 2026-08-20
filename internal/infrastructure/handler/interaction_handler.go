package handler

import (
	"net/http"

	"go-modular/internal/application/dto"
	"go-modular/internal/application/usecase"
	"go-modular/pkg/response"
)

type InteractionHandler struct {
	uc *usecase.InteractionUseCase
}

func NewInteractionHandler(uc *usecase.InteractionUseCase) *InteractionHandler {
	return &InteractionHandler{uc: uc}
}

func (h *InteractionHandler) Like(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	postID := r.PathValue("id")
	if err := h.uc.Like(r.Context(), userID, postID); err != nil {
		response.Error(w, http.StatusBadRequest, "LIKE_FAILED", err.Error())
		return
	}
	count, _ := h.uc.GetLikeCount(r.Context(), postID)
	response.Success(w, http.StatusOK, dto.ClapResponse{PostID: postID, Total: count})
}

func (h *InteractionHandler) Unlike(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	postID := r.PathValue("id")
	if err := h.uc.Unlike(r.Context(), userID, postID); err != nil {
		response.Error(w, http.StatusBadRequest, "UNLIKE_FAILED", err.Error())
		return
	}
	count, _ := h.uc.GetLikeCount(r.Context(), postID)
	response.Success(w, http.StatusOK, dto.ClapResponse{PostID: postID, Total: count})
}

func (h *InteractionHandler) GetLikeCount(w http.ResponseWriter, r *http.Request) {
	postID := r.PathValue("id")
	count, err := h.uc.GetLikeCount(r.Context(), postID)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "FAILED", err.Error())
		return
	}
	response.Success(w, http.StatusOK, dto.ClapResponse{PostID: postID, Total: count})
}
