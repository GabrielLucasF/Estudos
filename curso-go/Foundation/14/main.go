// Interfaces
package main

import "fmt"

type Endereco struct {
	City         string
	Number       int
	Country      string
	Neighborhood string
}

type Person interface {
	SetDesable()
}

type Client struct {
	Name   string
	Age    int
	Active bool
	Endereco
}

type Company struct {
	Name string
}

func (c Company) SetDesable() {
}

func (c Client) SetDesable() {
	c.Active = false
	fmt.Printf("O cliente: %s foi desativado", c.Name)
}

func Deactivation(person Person) {
	person.SetDesable()
}

func main() {
	gabriel := Client{
		Name:   "Gabriel",
		Age:    22,
		Active: true,
	}
	myCompany := Company{
		Name: "Minha Empresa",
	}
	Deactivation(gabriel)
	Deactivation(myCompany)
}
