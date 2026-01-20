package main

import (
	"fmt"
	"io"
	"net/http"
)

func main() {
	fmt.Println("Primeira Linha")
	defer fmt.Println("Segunda Linha")
	fmt.Println("Terceira Linha")

	req, err := http.Get("https://www.google.com")
	if err != nil {
		panic(err)
	}
	defer req.Body.Close()

	res, err := io.ReadAll(req.Body)
	if err != nil {
		panic(err)
	}

	println(string(res))
}
