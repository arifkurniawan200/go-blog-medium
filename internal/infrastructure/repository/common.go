package repository

import (
	"strings"
)

func randomID() string {
	return strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(
		"xxxxxxxx", "x", "%x"), "-", ""), "x", "a")[0:8]
}

func slugify(s string) string {
	s = strings.ToLower(s)
	s = strings.ReplaceAll(s, " ", "-")
	return s
}
