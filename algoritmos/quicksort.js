function quickSort(array, left, right) {
    if (left < right) {
        let pivot = partition(array, left, right);
        quickSort(array, left, pivot - 1);
        quickSort(array, pivot + 1, right);
    }
}

function partition(array, left, right) {
    let pivot = array[right];

    let indiceMenor = left - 1;

    for (let indiceAtual = left; indiceAtual < right; indiceAtual++) {
        if (array[indiceAtual] < pivot) {
            indiceMenor++;
            [array[indiceMenor], array[indiceAtual]] = [array[indiceAtual], array[indiceMenor]];
        }
    }

    [array[indiceMenor + 1], array[right]] = [array[right], array[indiceMenor + 1]];

    return indiceMenor + 1;
}

const array = [42, 7, 19, 3, 56, 11, 29, 4, 33, 18, 25, 2, 50, 9, 61];
quickSort(array, 0, array.length - 1);
