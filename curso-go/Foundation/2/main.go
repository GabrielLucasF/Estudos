// Declaração e atribuição
package main

import "fmt"

const message = "Hello, World!"

var (
	boolean  bool    = true
	integer  int     = 10
	floating float64 = 1.2
	str      string  = "Gabriel!"
)

func main() {
	message := "Hello, World!"
	message = "Hello"

	fmt.Println(message)
	fmt.Println(boolean)
	fmt.Println(integer)
	fmt.Println(floating)
	fmt.Println(str)
}
