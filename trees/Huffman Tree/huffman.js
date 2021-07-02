class Solution {
    static buildHuffmanTree(s) {
        if (s.length < 1) {
            return null;
        }
        let freqMap = new Map();
        for (let i = 0; i < s.length; i++) {
            let ch = s.charAt(i);
            let freq = (freqMap.has(ch) ? freqMap.get(ch) + 1 : 1);
            freqMap.set(ch, freq);
        }
        let queue = new PriorityQueue();
        freqMap.forEach(function (freq, ch) {
            queue.enqueue(new HuffmanLeafNode(ch, freq));
        });
        while (queue.size() > 1) {
            let leftNode = queue.dequeue();
            let rightNode = queue.dequeue();
            queue.enqueue(new HuffmanInternalNode(leftNode, rightNode));
        }
        return queue.dequeue();
    }
    static encodeHuffman(root, prefix, huffmanCode) {
        if (root) {
            if (root.isLeaf) {
                huffmanCode.set(root.ch, prefix.length ? prefix : '1');
            }
            Solution.encodeHuffman(root.left, prefix + '0', huffmanCode);
            Solution.encodeHuffman(root.right, prefix + '1', huffmanCode);
        }
    }
    static decodeHuffman(root, encoded) {
        let decoded = "";
        let tempNode = root;
        for (let i = 0, eLen = encoded.length; i < eLen; i++) {
            let code = encoded.charAt(i);
            if (code == '0') {
                tempNode = tempNode.left;
            }
            else if (code == '1') {
                tempNode = tempNode.right;
            }
            if (tempNode.isLeaf) {
                decoded += tempNode.ch;
                tempNode = root;
            }
        }
        return decoded;
    }
}
class HuffmanBaseNode {
    constructor(freq) {
        this.freq = freq;
    }
}
class HuffmanLeafNode extends HuffmanBaseNode {
    constructor(ch, freq) {
        super(freq);
        this.ch = ch;
        this.isLeaf = true;
    }
}
class HuffmanInternalNode extends HuffmanBaseNode {
    constructor(left, right) {
        super(left.freq + right.freq);
        this.left = left;
        this.right = right;
        this.isLeaf = false;
    }
}
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    enqueue(node) {
        let added = false;
        for (let i = 0, qLen = this.items.length; i < qLen; i++) {
            let item = this.items[i];
            if (node.freq == item.freq && node.isLeaf) {
                this.items.splice(i + 1, 0, node);
                added = true;
                break;
            }
            if (node.freq <= item.freq) {
                this.items.splice(i, 0, node);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(node);
        }
    }
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }
    isEmpty() {
        return (this.items.length == 0);
    }
    size() {
        return this.items.length;
    }
}
