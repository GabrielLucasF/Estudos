package main

type MyNumber int

type MyOtherNumber float64

type Number interface {
	~int | ~float64
}

func Sum[T Number](m map[string]T) T {
	var sum T
	for _, v := range m {
		sum += v
	}

	return sum
}

func Compare[T comparable](a T, b T) bool {
	if a == b {
		return true
	}
	return false
}

func main() {
	m := map[string]int{
		"Gabriel":  100,
		"Lucas":    200,
		"Fersants": 300,
	}

	m2 := map[string]float64{
		"Gabriel":  100.10,
		"Lucas":    200.20,
		"Fersants": 300.30,
	}

	m3 := map[string]MyNumber{
		"Gabriel":  100,
		"Lucas":    200,
		"Fersants": 300,
	}

	m4 := map[string]MyOtherNumber{
		"Gabriel":  100,
		"Lucas":    200,
		"Fersants": 300,
	}

	println(Sum(m))
	println(Sum(m2))
	println(Sum(m3))
	println(Sum(m4))
	println(Compare(10, 10.1))
}
