package main

import (
	"fmt"

	"curso-go/math"
)

func main() {
	s := math.Sum(10, 20)
	fmt.Printf("Resultado: %v", s)
}
