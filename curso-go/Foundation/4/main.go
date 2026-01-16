// Importando fmt e tipagem
package main

import "fmt"

const message = "Hello, World!"

type ID int

var (
	boolean  bool    = true
	integer  int     = 10
	floating float64 = 1.2
	str      string  = "Gabriel!"
	id       ID      = 1
)

func main() {
	fmt.Printf("O tipo do ID é: %T", id)
}
