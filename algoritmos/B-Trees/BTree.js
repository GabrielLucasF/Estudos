class BTreeNode {
    constructor(order, isLeaf = true) {
        this.order = order;
        this.keys = [];
        this.children = [];
        this.isLeaf = isLeaf;
        this.minKeys = Math.ceil(order / 2) - 1;
        this.maxKeys = order - 1;
    }

    isFull() {
        return this.keys.length >= this.maxKeys;
    }

    hasMinKeys() {
        return this.keys.length >= this.minKeys;
    }

    findKeyIndex(key) {
        let left = 0;
        let right = this.keys.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (this.keys[mid] === key) return mid;
            if (this.keys[mid] < key) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }

    split(parent, childIndex) {
        const newNode = new BTreeNode(this.order, this.isLeaf);

        const midIndex = Math.floor(this.keys.length / 2);
        const medianKey = this.keys[midIndex];

        newNode.keys = this.keys.slice(midIndex + 1);
        this.keys = this.keys.slice(0, midIndex);

        if (!this.isLeaf) {
            newNode.children = this.children.slice(midIndex + 1);
            this.children = this.children.slice(0, midIndex + 1);
        }

        parent.keys.splice(childIndex, 0, medianKey);
        parent.children.splice(childIndex + 1, 0, newNode);

        if (parent.isLeaf) {
            parent.isLeaf = false;
        }

        if (newNode.keys.length === 0) {
            parent.keys.splice(childIndex, 1);
            parent.children.splice(childIndex + 1, 1);
        }
    }
}

class BTree {
    constructor(order = 3) {
        if (order < 2) {
            throw new Error("Ordem deve ser pelo menos 2");
        }
        this.order = order;
        this.root = new BTreeNode(order, true);
    }

    search(key) {
        return this._search(this.root, key);
    }

    _search(node, key) {
        let i = 0;

        while (i < node.keys.length && key > node.keys[i]) {
            i++;
        }

        if (i < node.keys.length && node.keys[i] === key) {
            return { found: true, key: node.keys[i] };
        }

        if (node.isLeaf) {
            return { found: false };
        }

        return this._search(node.children[i], key);
    }

    insert(key) {
        if (this.search(key).found) {
            return false;
        }

        const root = this.root;

        if (root.isFull()) {
            const newRoot = new BTreeNode(this.order, false);
            newRoot.children.push(root);
            this.root = newRoot;

            root.split(newRoot, 0);

            this._insertNonFull(newRoot, key);
        } else {
            this._insertNonFull(root, key);
        }

        return true;
    }

    _insertNonFull(node, key) {
        if (node.isLeaf) {
            const insertIndex = node.findKeyIndex(key);
            node.keys.splice(insertIndex, 0, key);
        } else {
            let childIndex = node.findKeyIndex(key);
            const child = node.children[childIndex];

            if (child.isFull()) {
                child.split(node, childIndex);

                if (key > node.keys[childIndex]) {
                    childIndex++;
                }
            }

            this._insertNonFull(node.children[childIndex], key);
        }
    }

    remove(key) {
        if (!this.search(key).found) {
            return false;
        }

        this._remove(this.root, key);

        if (this.root.keys.length === 0 && !this.root.isLeaf) {
            this.root = this.root.children[0];
        }

        return true;
    }

    _remove(node, key) {
        const keyIndex = node.findKeyIndex(key);

        if (keyIndex < node.keys.length && node.keys[keyIndex] === key) {
            if (node.isLeaf) {
                node.keys.splice(keyIndex, 1);
            } else {
                this._removeFromInternalNode(node, keyIndex);
            }
        } else {
            if (node.isLeaf) {
                return;
            }

            let childIndex = keyIndex;
            if (childIndex >= node.children.length) {
                childIndex = node.children.length - 1;
            }

            const child = node.children[childIndex];

            if (!child) {
                return;
            }

            if (!child.hasMinKeys()) {
                this._fixChildBeforeRemoval(node, childIndex);
                childIndex = node.findKeyIndex(key);
                if (childIndex >= node.children.length) {
                    childIndex = node.children.length - 1;
                }
            }

            this._remove(node.children[childIndex], key);
        }
    }

    _removeFromInternalNode(node, keyIndex) {
        const key = node.keys[keyIndex];
        const leftChild = node.children[keyIndex];
        const rightChild = node.children[keyIndex + 1];

        if (leftChild.keys.length > leftChild.minKeys) {
            const predecessor = this._getPredecessor(leftChild);
            node.keys[keyIndex] = predecessor;
            this._remove(leftChild, predecessor);
        } else if (rightChild.keys.length > rightChild.minKeys) {
            const successor = this._getSuccessor(rightChild);
            node.keys[keyIndex] = successor;
            this._remove(rightChild, successor);
        } else {
            this._merge(node, keyIndex);
            this._remove(leftChild, key);
        }
    }

    _getPredecessor(node) {
        while (!node.isLeaf) {
            node = node.children[node.children.length - 1];
        }
        return node.keys[node.keys.length - 1];
    }

    _getSuccessor(node) {
        while (!node.isLeaf) {
            node = node.children[0];
        }
        return node.keys[0];
    }

    _fixChildBeforeRemoval(parent, childIndex) {
        const child = parent.children[childIndex];

        if (childIndex > 0) {
            const leftSibling = parent.children[childIndex - 1];
            if (leftSibling.keys.length > leftSibling.minKeys) {
                this._borrowFromLeft(parent, childIndex, childIndex - 1);
                return childIndex;
            }
        }

        if (childIndex < parent.children.length - 1) {
            const rightSibling = parent.children[childIndex + 1];
            if (rightSibling.keys.length > rightSibling.minKeys) {
                this._borrowFromRight(parent, childIndex, childIndex + 1);
                return childIndex;
            }
        }

        if (childIndex > 0) {
            this._merge(parent, childIndex - 1);
            return childIndex - 1;
        } else {
            this._merge(parent, childIndex);
            return childIndex;
        }
    }

    _borrowFromLeft(parent, childIndex, siblingIndex) {
        const child = parent.children[childIndex];
        const sibling = parent.children[siblingIndex];

        const parentKey = parent.keys[siblingIndex];
        const siblingKey = sibling.keys.pop();

        child.keys.unshift(parentKey);
        parent.keys[siblingIndex] = siblingKey;

        if (!sibling.isLeaf && sibling.children.length > 0) {
            const siblingChild = sibling.children.pop();
            child.children.unshift(siblingChild);
        }
    }

    _borrowFromRight(parent, childIndex, siblingIndex) {
        const child = parent.children[childIndex];
        const sibling = parent.children[siblingIndex];

        const parentKey = parent.keys[childIndex];
        const siblingKey = sibling.keys.shift();

        child.keys.push(parentKey);
        parent.keys[childIndex] = siblingKey;

        if (!sibling.isLeaf && sibling.children.length > 0) {
            const siblingChild = sibling.children.shift();
            child.children.push(siblingChild);
        }
    }

    _merge(parent, index) {
        const leftChild = parent.children[index];
        const rightChild = parent.children[index + 1];

        if (!leftChild || !rightChild) {
            return;
        }

        leftChild.keys.push(parent.keys[index]);
        leftChild.keys.push(...rightChild.keys);

        if (!rightChild.isLeaf) {
            leftChild.children.push(...rightChild.children);
        }

        parent.keys.splice(index, 1);
        parent.children.splice(index + 1, 1);
    }

    traverse() {
        const result = [];
        this._inOrderTraversal(this.root, result);
        return result;
    }

    _inOrderTraversal(node, result) {
        if (node.isLeaf) {
            result.push(...node.keys);
        } else {
            for (let i = 0; i < node.keys.length; i++) {
                this._inOrderTraversal(node.children[i], result);
                result.push(node.keys[i]);
            }
            this._inOrderTraversal(node.children[node.keys.length], result);
        }
    }

    print() {
        console.log(JSON.stringify(this._formatNode(this.root), null, 2));
    }

    _formatNode(node) {
        const formatted = {
            keys: node.keys,
            isLeaf: node.isLeaf,
        };

        if (!node.isLeaf) {
            formatted.children = node.children.map((child) => this._formatNode(child));
        }

        return formatted;
    }

    validate() {
        return this._validateNode(this.root);
    }

    _validateNode(node) {
        for (let i = 1; i < node.keys.length; i++) {
            if (node.keys[i] <= node.keys[i - 1]) {
                return { valid: false, error: "Chaves não ordenadas" };
            }
        }

        if (node.keys.length > node.maxKeys) {
            return { valid: false, error: "Nó acima do máximo de chaves" };
        }

        if (node.isLeaf && node.children.length > 0) {
            return { valid: false, error: "Nó folha não deveria ter filhos" };
        }

        if (!node.isLeaf && node.children.length !== node.keys.length + 1) {
            return { valid: false, error: "Número incorreto de filhos" };
        }

        if (!node.isLeaf) {
            for (const child of node.children) {
                const childValidation = this._validateNode(child);
                if (!childValidation.valid) {
                    return childValidation;
                }
            }
        }

        return { valid: true };
    }
}

module.exports = { BTree, BTreeNode };
