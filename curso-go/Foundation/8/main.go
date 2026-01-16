// Funções
package main

import (
	"errors"
	"fmt"
)

func main() {
	valor, err := sum(10, 5)

	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(valor)
}

func sum(n1, n2 int) (int, error) {
	if n1+n2 >= 50 {
		return 0, errors.New("soma é maior que 50")
	}
	return n1 + n2, nil
}
