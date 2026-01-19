package main

func main() {
	a := 1
	b := 2
	c := 3

	if a > b || c > a {
		println(a)
	} else {
		println(b)
	}

	switch a {
	case 1:
		println("one")
	case 2:
		println("two")
	case 3:
		println("three")
	default:
		println("default")
	}
}
