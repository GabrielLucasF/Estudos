// Criação de tipos
package main

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
	println(message)
	println(boolean)
	println(integer)
	println(floating)
	println(str)
	println(id)
}
