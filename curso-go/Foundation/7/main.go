// Maps
package main

import "fmt"

func main() {
	salarios := map[string]int{
		"joão":  1000,
		"maria": 2000,
		"pedro": 3000,
	}

	for nome, salario := range salarios {
		fmt.Printf("O salario de %s é %d\n", nome, salario)
	}

	for _, salario := range salarios {
		fmt.Printf("O salario é %d\n", salario)
	}
}
