package main

import (
	"curso-go/math"
	"fmt"
)

func main() {
	s := math.Sum(10, 20)
	fmt.Println("Resultado:", s)
	fmt.Println(math.A)

	car := math.Car{
		Make:  "Honda",
		Model: "Civic",
	}
	fmt.Println(car)
	fmt.Println(car.Make)
	fmt.Println(car.Model)
	fmt.Println(car.Run())
}
