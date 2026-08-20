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

type UserHandler struct {
	uc *usecase.UserUseCase
}

func NewUserHandler(uc *usecase.UserUseCase) *UserHandler {
	return &UserHandler{uc: uc}
}

func (h *UserHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req dto.CreateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.Error(w, http.StatusBadRequest, "INVALID_JSON", err.Error())
		return
	}
	resp, err := h.uc.Create(r.Context(), req)
	if err != nil {
		response.Error(w, http.StatusBadRequest, "CREATE_FAILED", err.Error())
		return
	}
	response.Success(w, http.StatusCreated, resp)
}

func (h *UserHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	resp, err := h.uc.GetByID(r.Context(), id)
	if err != nil {
		response.Error(w, http.StatusNotFound, "NOT_FOUND", err.Error())
		return
	}
	response.Success(w, http.StatusOK, resp)
}

func (h *UserHandler) List(w http.ResponseWriter, r *http.Request) {
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	p := pager.New(page, limit)
	users, total, err := h.uc.List(r.Context(), p.Page, p.Limit)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "LIST_FAILED", err.Error())
		return
	}
	response.Paginated(w, http.StatusOK, users, p.Page, p.Limit, total)
}

func (h *UserHandler) Update(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	var req dto.UpdateUserRequest
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

func (h *UserHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if err := h.uc.Delete(r.Context(), id); err != nil {
		response.Error(w, http.StatusNotFound, "NOT_FOUND", err.Error())
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
