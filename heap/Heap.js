class BinaryHeap {
    constructor() {
        this.heap = [];
    }

    parentIndex(index) {
        return Math.floor((index - 1)/2);
    }

    leftChildIndex(index) {
        return index * 2 + 1;
    }

    rightChildIndex(index) {
        return index * 2 + 2;
    }

    parent(index) {
        return this.heap[this.parentIndex(index)];
    }

    leftChild(index) {
        return this.heap[this.leftChildIndex(index)];
    }

    rightChild(index) {
        return this.heap[this.rightChildIndex(index)];        
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    swap(i, j) {
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
}


class MinHeap extends BinaryHeap {
    insert(val) {
        this.heap.push(val);
        this.percolateUp();
    }

    remove() {
        let item = this.heap[0];
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        this.percolateDown();
        return item;
    }

    build(arr) {
        for (let val of arr) {
            this.insert(val);
        }
    }

    percolateDown() {
        let index = 0;
        while (this.leftChild(index) && this.heap[index] > this.leftChild(index)) {
            let childIndex = this.leftChildIndex(index);
            let leftChild = this.leftChild(index);
            let rightChild = this.rightChild(index);
            
            if (rightChild && rightChild < leftChild) {
                childIndex = this.rightChildIndex(index);
            }

            this.swap(index, childIndex);
            index = childIndex;
        }
    }

    percolateUp() {
        let index = this.heap.length - 1;
        while (this.parent(index) && this.parent(index) > this.heap[index]) {
            this.swap(this.parentIndex(index), index);
            index = this.parentIndex(index);
        }
    }
}

class MaxHeap extends BinaryHeap {
    insert(val) {
        this.heap.push(val);
        this.percolateUp();
    }

    remove() {
        let item = this.heap[0];
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        this.percolateDown();
        return item;
    }

    build(arr) {
        for (let val of arr) {
            this.insert(val);
        }
    }

    percolateUp() {
        let index = this.heap.length - 1;
        while (this.parent(index) && this.parent(index) < this.heap[index]) {
            this.swap(this.parentIndex(index), index);
            index = this.parentIndex(index);
        }
    }

    percolateDown() {
        let index = 0;
        while (this.leftChild(index) && this.leftChild(index) > this.heap[index]) {
            let childIndex = this.leftChildIndex(index);

            if (this.rightChild(index) && this.rightChild(index) > this.leftChild(index)) {
                childIndex = this.rightChildIndex(index);
            }
            
            this.swap(index, childIndex);
            index = childIndex;
        }
    }
}