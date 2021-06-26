function partition(arr, leftIndex, rightIndex) {
    let pivot = arr[Math.floor((leftIndex + rightIndex)/2)];

    while (leftIndex <= rightIndex) {
        while (arr[leftIndex] < pivot) {
            leftIndex++;
        }

        while (pivot < arr[rightIndex]) {
            rightIndex--;
        }

        if (leftIndex <= rightIndex) {
            let temp = arr[leftIndex];
            arr[leftIndex] = arr[rightIndex];
            arr[rightIndex] = temp;
            leftIndex++;
            rightIndex--;
        }
    }

    return leftIndex;
}

function quickSortHelper(arr, leftIndex, rightIndex) {
    if (arr.length > 1) {
        let index = partition(arr, leftIndex, rightIndex);
        
        if (leftIndex < index) {
            quickSortHelper(arr, leftIndex, index);
        }

        if (index+1 < rightIndex) {
            quickSortHelper(arr, index+1, rightIndex);
        }
    }

    return arr;
}

function quickSort(arr) {
    return quickSortHelper(arr, 0, arr.length-1);
}