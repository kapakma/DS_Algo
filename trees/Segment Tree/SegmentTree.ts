class SegmentTree {
    private tree: number[];
    private size: number;

    constructor(arr: number[]) {
        this.tree = [];
        this.size = arr.length;
        this.build(arr, 0, 0, this.size-1);
    }

    query(left: number, right: number): number {
        return this.queryHelper(left, right, 0, this.size-1, 0);
    }

    update(index: number, value: number): void {
        this.updateHelper(index, 0, this.size-1, 0, value);
    }

    private build(arr: number[], index: number, leftIndex: number, rightIndex: number): number {
        let value: number;
        if (leftIndex == rightIndex) {
            value = arr[leftIndex];
        }
        else {
            let mid: number = SegmentTree.getMid(leftIndex, rightIndex);
            value = SegmentTree.compute(
                        this.build(arr, SegmentTree.leftChild(index), leftIndex, mid), 
                        this.build(arr, SegmentTree.rightChild(index), mid + 1, rightIndex)
                    );
        }
        this.tree[index] = value;
        return value;
    }

    private queryHelper(left: number, right: number, segLeft: number, segRight: number, index: number): number {
        if (left > segRight || right < segLeft) {
            return 0;
        }

        if (left <= segLeft && segRight <= right) {
            return this.tree[index];
        }

        let mid = SegmentTree.getMid(segLeft, segRight);
        return SegmentTree.compute(
                    this.queryHelper(left, right, segLeft, mid, SegmentTree.leftChild(index)),
                    this.queryHelper(left, right, mid+1, segRight, SegmentTree.rightChild(index))
                );
        
    }

    private updateHelper(index: number, segLeft: number, segRight: number, node: number, value: number): void {
        if (index < segLeft || index > segRight) {
            return;
        }

        if (segLeft == segRight) {
            this.tree[node] = value;
        }
        else {
            let mid = SegmentTree.getMid(segLeft, segRight);
            if (segLeft <= index && index <= mid) {
                this.updateHelper(index, segLeft, mid, SegmentTree.leftChild(node), value);
            }
            else {
                this.updateHelper(index, mid+1, segRight, SegmentTree.rightChild(node), value);
            }

            this.tree[node] = SegmentTree.compute(
                this.tree[SegmentTree.leftChild(node)], 
                this.tree[SegmentTree.rightChild(node)]
            );
        }
    }

    private static compute(value1: number, value2: number): number {
        return value1 + value2;
    }

    private static getMid(left: number, right: number): number {
        return Math.floor((left + right)/2);
    }

    private static leftChild(index: number): number {
        return (index * 2 + 1);
    }

    private static rightChild(index: number): number {
        return (index * 2 + 2);
    }
}