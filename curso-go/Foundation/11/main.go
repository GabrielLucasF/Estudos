// Iniciando com Struct
package main

import "fmt"

type Client struct {
	Name   string
	Age    int
	Active bool
}

func main() {
	gabriel := Client{
		Name:   "Gabriel",
		Age:    22,
		Active: true,
	}

	gabriel.Active = false

	fmt.Printf("Nome: %s, Idade: %d, Ativo: %t", gabriel.Name, gabriel.Age, gabriel.Active)
}
