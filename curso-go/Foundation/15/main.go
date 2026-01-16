// Ponteiros
package main

func main() {
	// Memória -> Endereço -> Valor
	a := 10
	var pointer *int = &a
	*pointer = 20
	b := &a
	*b = 30

	println(a)
}
