package main

import "fmt"

func main() {
	var myVar interface{} = "Gabriel Lucas"

	println(myVar.(string))
	res, ok := myVar.(string)
	fmt.Printf("O valor de res é: %v e o valor de ok é: %v\n", res, ok)
	res2, ok2 := myVar.(int)
	fmt.Printf("O valor de res é: %v e o valor de ok é: %v\n", res2, ok2)
}
