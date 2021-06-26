class UnionFind {
    constructor(n) {
        this.parents = new Array(n);
        this.sizes = new Array(n);

        for (let i = 0; i < n; i++) {
            this.parents[i] = i;
            this.sizes[i] = 1;
        }
    }

    getRoot(node) {
        let root = node;
        while (root != this.parents[root]) {
            root = this.parents[root];
        }

        //path compression
        while (node != this.parents[node]) {
            let temp = this.parents[node];
            this.parents[node] = root;
            node = temp;
        }

        return root;
    }

    union(node1, node2) {
        let root1 = this.getRoot(node1);
        let root2 = this.getRoot(node2);

        if (root1 != root2) {
            if (this.sizes[root1] < this.sizes[root2]) {
                this.parents[root1] = root2;
                this.sizes[root2] += this.sizes[root1];
            }
            else {
                this.parents[root2] = root1;
                this.sizes[root1] += this.sizes[root2];
            }
        }
    }

    find(node1, node2) {
        return (this.getRoot(node1) == this.getRoot(node2));
    }
}