// Composição de Structs
package main

import "fmt"

type Endereco struct {
	City         string
	Number       int
	Country      string
	Neighborhood string
}

type Client struct {
	Name   string
	Age    int
	Active bool
	Endereco
}

func main() {
	gabriel := Client{
		Name:   "Gabriel",
		Age:    22,
		Active: true,
	}

	gabriel.Active = false
	gabriel.City = "São Paulo"
	gabriel.Number = 1
	gabriel.Country = "Brasil"
	gabriel.Neighborhood = "Centro"

	fmt.Printf("Nome: %s, Idade: %d, Ativo: %t, Cidade: %s, Numero: %d, Pais: %s, Bairro: %s", gabriel.Name, gabriel.Age, gabriel.Active, gabriel.City, gabriel.Number, gabriel.Country, gabriel.Neighborhood)
}
