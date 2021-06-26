function binarySearch(arr, searchVal) {
    let leftIndex = 0;
    let rightIndex = arr.length - 1;

    while (leftIndex <= rightIndex) {
        let midIndex = Math.floor((leftIndex + rightIndex)/2);
        if (searchVal < arr[midIndex]) {
            rightIndex = midIndex - 1;
        }
        else if (searchVal > arr[midIndex]) {
            leftIndex = midIndex + 1;
        }
        else {
            return midIndex;
        }
    }

    return -1;
}