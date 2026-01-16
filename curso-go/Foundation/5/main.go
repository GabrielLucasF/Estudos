// Percorrendo Arrays
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
	var meuArray [3]int
	meuArray[0] = 10
	meuArray[1] = 20
	meuArray[2] = 30

	for i, v := range meuArray {
		fmt.Printf("O valor do índice %d é %d\n", i, v)
	}
}
