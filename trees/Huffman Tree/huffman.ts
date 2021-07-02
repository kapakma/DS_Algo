class Solution {
    static buildHuffmanTree(s: string): HuffmanBaseNode {
        if (s.length < 1) {
            return null;
        }

        let freqMap: Map<string, number> = new Map();
        for (let i = 0; i < s.length; i++) {
            let ch: string = s.charAt(i);
            let freq: number = (freqMap.has(ch) ? freqMap.get(ch)+1 : 1);
            freqMap.set(ch, freq);
        }

        let queue: PriorityQueue = new PriorityQueue();
        freqMap.forEach(function(freq, ch) {
            queue.enqueue(new HuffmanLeafNode(ch, freq));
        });
        
        while (queue.size() > 1) {
            let leftNode = queue.dequeue();
            let rightNode = queue.dequeue();
            queue.enqueue(new HuffmanInternalNode(leftNode, rightNode));
        }
        
        return queue.dequeue();
    }
    
    static encodeHuffman(root: HuffmanBaseNode, prefix: string, huffmanCode: Map<string, string>): void {
        if (root) {
            if (root.isLeaf) {
                huffmanCode.set(root.ch, prefix.length ? prefix : '1');
            }
            Solution.encodeHuffman(root.left, prefix + '0', huffmanCode);
            Solution.encodeHuffman(root.right, prefix + '1', huffmanCode);
        }
    }

    static decodeHuffman(root: HuffmanBaseNode, encoded: string): string {
        let decoded: string = "";
        let tempNode: HuffmanBaseNode = root;
        
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
    ch: string;
    freq: number;
    isLeaf: boolean;
    left: HuffmanBaseNode;
    right: HuffmanBaseNode;

    constructor(freq: number) {
        this.freq = freq;
    }
}

class HuffmanLeafNode extends HuffmanBaseNode {
    constructor(ch: string, freq: number) {
        super(freq);
        this.ch = ch;
        this.isLeaf = true;
    }
}

class HuffmanInternalNode extends HuffmanBaseNode {
    constructor(left: HuffmanBaseNode, right: HuffmanBaseNode) {
        super(left.freq + right.freq);
        this.left = left;
        this.right = right;
        this.isLeaf = false;
    }
}

class PriorityQueue {
    items: HuffmanBaseNode[];
    
    constructor() {
        this.items = [];
    }

    enqueue(node: HuffmanBaseNode): void {
        let added: boolean = false;
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
            this.items.push(node)
        }
    }

    dequeue(): HuffmanBaseNode {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();        
    }

    isEmpty(): boolean {
        return (this.items.length == 0);
    }

    size(): number {
        return this.items.length;
    }
}
