package main

func main() {
	for i := 0; i < 10; i++ {
		println(i)
	}

	for i := range 10 {
		println(i)
	}

	numbers := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
	for _, v := range numbers {
		println(v)
	}

	i := 0
	for i < 10 {
		println(i)
		i++
	}

	for {
		println("Hello, World!")
	}
}
