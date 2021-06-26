function merge(leftArr, rightArr) {
    let leftIndex = 0;
    let rightIndex = 0;
    let result = [];
    
    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
        let leftItem = leftArr[leftIndex];
        let rightItem = rightArr[rightIndex];

        if (leftItem < rightItem) {
            result.push(leftItem);
            leftIndex++;
        }
        else {
            result.push(rightItem);
            rightIndex++;
        }
    }

    if (leftIndex < leftArr.length) {
        result = result.concat(leftArr.slice(leftIndex));
    }
    else if (rightIndex < rightArr.length) {
        result = result.concat(rightArr.slice(rightIndex));
    }

    return result;
}

function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    let mid = Math.floor(arr.length/2);
    return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}