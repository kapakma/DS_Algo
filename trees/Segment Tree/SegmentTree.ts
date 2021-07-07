class SegmentNode {
    value: number;
    left: number;
    right: number;

    constructor(value: number, left: number, right: number) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class SegmentTree {
    tree: SegmentNode[];

    constructor(arr: number[]) {
        this.tree = [];
        this.build(arr, 0, 0, arr.length-1);
    }

    queryMax(left: number, right: number): number {
        let segLeft: number = this.tree[0].left;
        let segRight: number = this.tree[0].right;
        return this.queryMaxHelper(left, right, segLeft, segRight, 0);
    }

    update(index: number, value: number): void {
        let segLeft: number = this.tree[0].left;
        let segRight: number = this.tree[0].right;
        this.updateHelper(index, segLeft, segRight, 0, value);
    }

    private build(arr: number[], index: number, leftIndex: number, rightIndex: number): number {
        let max: number;
        if (leftIndex == rightIndex) {
            max = arr[leftIndex];
        }
        else {
            let mid: number = SegmentTree.getMid(leftIndex, rightIndex);
            max = Math.max(
                    this.build(arr, SegmentTree.leftChild(index), leftIndex, mid), 
                    this.build(arr, SegmentTree.rightChild(index), mid + 1, rightIndex)
                    );
        }
        this.tree[index] = new SegmentNode(max, leftIndex, rightIndex);
        return max;
    }

    private queryMaxHelper(left: number, right: number, segLeft: number, segRight: number, index: number): number {
        if (left > segRight || right < segLeft) {
            return -1;
        }

        if (left <= segLeft && segRight <= right) {
            return this.tree[index].value;
        }

        let mid = SegmentTree.getMid(segLeft, segRight);
        return Math.max(
                this.queryMaxHelper(left, right, segLeft, mid, SegmentTree.leftChild(index)),
                this.queryMaxHelper(left, right, mid+1, segRight, SegmentTree.rightChild(index))
            );
        
    }

    private updateHelper(index: number, segLeft: number, segRight: number, node: number, value: number): void {
        if (index < segLeft || index > segRight) {
            return;
        }

        if (segLeft == segRight) {
            this.tree[node].value = value;
        }
        else {
            let mid = SegmentTree.getMid(segLeft, segRight);
            if (segLeft <= index && index <= mid) {
                this.updateHelper(index, segLeft, mid, SegmentTree.leftChild(node), value);
            }
            else {
                this.updateHelper(index, mid+1, segRight, SegmentTree.rightChild(node), value);
            }

            this.tree[node].value = Math.max(
                this.tree[SegmentTree.leftChild(node)].value, 
                this.tree[SegmentTree.rightChild(node)].value
            );
        }
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