package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"go-modular/internal/application/dto"
	"go-modular/internal/application/usecase"
	"go-modular/pkg/pager"
	"go-modular/pkg/response"
)

type PostHandler struct {
	uc *usecase.PostUseCase
}

func NewPostHandler(uc *usecase.PostUseCase) *PostHandler {
	return &PostHandler{uc: uc}
}

func (h *PostHandler) Create(w http.ResponseWriter, r *http.Request) {
	authorID := r.Header.Get("X-User-ID")
	var req dto.CreatePostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.Error(w, http.StatusBadRequest, "INVALID_JSON", err.Error())
		return
	}
	resp, err := h.uc.Create(r.Context(), authorID, req)
	if err != nil {
		response.Error(w, http.StatusBadRequest, "CREATE_FAILED", err.Error())
		return
	}
	response.Success(w, http.StatusCreated, resp)
}

func (h *PostHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	resp, err := h.uc.GetByID(r.Context(), id)
	if err != nil {
		response.Error(w, http.StatusNotFound, "NOT_FOUND", err.Error())
		return
	}
	response.Success(w, http.StatusOK, resp)
}

func (h *PostHandler) GetBySlug(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")
	resp, err := h.uc.GetBySlug(r.Context(), slug)
	if err != nil {
		response.Error(w, http.StatusNotFound, "NOT_FOUND", err.Error())
		return
	}
	response.Success(w, http.StatusOK, resp)
}

func (h *PostHandler) List(w http.ResponseWriter, r *http.Request) {
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	status := r.URL.Query().Get("status")
	p := pager.New(page, limit)
	posts, total, err := h.uc.List(r.Context(), p.Page, p.Limit, status)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "LIST_FAILED", err.Error())
		return
	}
	response.Paginated(w, http.StatusOK, posts, p.Page, p.Limit, total)
}

func (h *PostHandler) Update(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	var req dto.UpdatePostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.Error(w, http.StatusBadRequest, "INVALID_JSON", err.Error())
		return
	}
	resp, err := h.uc.Update(r.Context(), id, req)
	if err != nil {
		response.Error(w, http.StatusBadRequest, "UPDATE_FAILED", err.Error())
		return
	}
	response.Success(w, http.StatusOK, resp)
}

func (h *PostHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if err := h.uc.Delete(r.Context(), id); err != nil {
		response.Error(w, http.StatusNotFound, "NOT_FOUND", err.Error())
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
