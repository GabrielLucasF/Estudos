package main

import (
	"fmt"
)

func main() {
	array := []int{4, 2, 1, 3, 5}

	fmt.Println(mergeSort(array))
}

func splitArray(array []int) ([]int, []int) {
	middle := len(array) / 2
	left := array[:middle]
	right := array[middle:]

	return left, right
}

func mergeArrays(left, right []int) []int {
	result := make([]int, 0, len(left)+len(right))
	leftIndex := 0
	rightIndex := 0

	for leftIndex < len(left) && rightIndex < len(right) {
		if left[leftIndex] < right[rightIndex] {
			result = append(result, left[leftIndex])
			leftIndex++
		} else {
			result = append(result, right[rightIndex])
			rightIndex++
		}
	}

	result = append(result, left[leftIndex:]...)
	result = append(result, right[rightIndex:]...)

	return result
}

func mergeSort(array []int) []int {
	fmt.Println("Array: ", array)

	if len(array) <= 1 {
		return array
	}

	left, right := splitArray(array)

	fmt.Println("Left:", left)
	fmt.Println("Right:", right)

	leftSorted := mergeSort(left)
	rightSorted := mergeSort(right)

	fmt.Println("leftSorted:", leftSorted)
	fmt.Println("rightSorted:", rightSorted)

	merge := mergeArrays(leftSorted, rightSorted)
	fmt.Println("merge", merge)

	return merge
}
