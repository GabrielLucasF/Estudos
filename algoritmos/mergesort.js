// MergeSort para Arrays

function splitArray(array) {
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    
    return { left, right };
}

function mergeArrays(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    const remainingLeft = left.slice(leftIndex);
    const remainingRight = right.slice(rightIndex);
    
    return result.concat(remainingLeft).concat(remainingRight);
}

function mergeSort(array) {
    console.log(array);

    if (array.length <= 1) {
        return array;
    }
    
    const { left, right } = splitArray(array);

    console.log("Left:", left);
    console.log("Right:", right);
    
    const leftSorted = mergeSort(left);
    const rightSorted = mergeSort(right);
    
    return mergeArrays(leftSorted, rightSorted);
}

const array = [4, 2, 1, 3, 5, 6];

console.log(mergeSort(array));
