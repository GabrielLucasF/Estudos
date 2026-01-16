package main

import "fmt"

type Customer struct {
	Name string
}

type Account struct {
	Amount int
}

func (c Customer) andou() {
	c.Name = "Gabriel Lucas"
	fmt.Printf("O cliente %v andou!\n", c.Name)
}

func (a *Account) simular(value int) int {
	a.Amount += value
	println(a.Amount)
	return a.Amount
}

func newAccount() *Account {
	return &Account{Amount: 0}
}

func main() {
	customer := Customer{
		Name: "Gabriel",
	}

	customer.andou()
	fmt.Printf("O valor da struct com nome %v\n", customer.Name)

	account := Account{Amount: 100}
	account.simular(200)
	println(account.Amount)
}
