// Métodos em Structs
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

func (c *Client) SetDesable() {
	c.Active = false
	fmt.Printf("O cliente: %s foi desativado", c.Name)
}

func main() {
	gabriel := Client{
		Name:   "Gabriel",
		Age:    22,
		Active: true,
	}

	gabriel.SetDesable()
}
