package handler

import (
	"net/http"
	"strconv"

	"go-modular/internal/application/usecase"
	"go-modular/pkg/pager"
	"go-modular/pkg/response"
)

type BookmarkHandler struct {
	uc *usecase.BookmarkUseCase
}

func NewBookmarkHandler(uc *usecase.BookmarkUseCase) *BookmarkHandler {
	return &BookmarkHandler{uc: uc}
}

func (h *BookmarkHandler) Bookmark(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	postID := r.PathValue("id")
	if err := h.uc.Bookmark(r.Context(), userID, postID); err != nil {
		response.Error(w, http.StatusBadRequest, "BOOKMARK_FAILED", err.Error())
		return
	}
	response.Success(w, http.StatusCreated, map[string]string{"status": "bookmarked"})
}

func (h *BookmarkHandler) Unbookmark(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	postID := r.PathValue("id")
	if err := h.uc.Unbookmark(r.Context(), userID, postID); err != nil {
		response.Error(w, http.StatusBadRequest, "UNBOOKMARK_FAILED", err.Error())
		return
	}
	response.Success(w, http.StatusOK, map[string]string{"status": "unbookmarked"})
}

func (h *BookmarkHandler) GetUserBookmarks(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		userID = r.PathValue("id")
	}
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	p := pager.New(page, limit)
	posts, total, err := h.uc.GetUserBookmarks(r.Context(), userID, p.Page, p.Limit)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "FAILED", err.Error())
		return
	}
	result := make([]interface{}, len(posts))
	for i, p := range posts {
		result[i] = p
	}
	response.Paginated(w, http.StatusOK, result, p.Page, p.Limit, total)
}
