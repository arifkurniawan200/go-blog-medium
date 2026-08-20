package response

import (
	"encoding/json"
	"net/http"
)

type APIResponse struct {
	Success bool      `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   *APIError  `json:"error,omitempty"`
	Meta    *Meta      `json:"meta,omitempty"`
}

type APIError struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

type Meta struct {
	Page       int   `json:"page"`
	Limit      int   `json:"limit"`
	Total      int64 `json:"total"`
	TotalPages int   `json:"total_pages"`
}

func Success(w http.ResponseWriter, status int, data interface{}) {
	JSON(w, status, APIResponse{
		Success: true,
		Data:    data,
	})
}

func Error(w http.ResponseWriter, status int, code, message string) {
	JSON(w, status, APIResponse{
		Success: false,
		Error: &APIError{
			Code:    code,
			Message: message,
		},
	})
}

func Paginated(w http.ResponseWriter, status int, data interface{}, page, limit int, total int64) {
	pages := int(total) / limit
	if int(total)%limit > 0 {
		pages++
	}
	JSON(w, status, APIResponse{
		Success: true,
		Data:    data,
		Meta: &Meta{
			Page:       page,
			Limit:      limit,
			Total:      total,
			TotalPages: pages,
		},
	})
}

func JSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}
