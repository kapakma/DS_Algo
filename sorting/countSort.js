function countSort(arr) {
    let hash = {};
    for (let item of arr) {
        if (hash[item]) {
            hash[item]++;
        }
        else {
            hash[item] = 1;
        }
    }

    let result = [];
    for (let key in hash) {
        for (let i = 0; i < hash[key]; i++) {
            result.push(key);
        }
    }

    return result;
}