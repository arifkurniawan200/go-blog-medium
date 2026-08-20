package pager

type Page struct {
	Page  int `json:"page"`
	Limit int `json:"limit"`
}

func New(page, limit int) Page {
	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 20
	}
	return Page{Page: page, Limit: limit}
}

func (p Page) Offset() int {
	return (p.Page - 1) * p.Limit
}
