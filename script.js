class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(arr) {
    const sortedArray = [...new Set(arr.sort((a, b) => a - b))];
    this.root = this.buildTree(sortedArray);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return
    }

    const insertNode = (node, newNode) => {
      if (newNode.data === node.data) return;

      if (newNode.data < node.data) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right === newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    };

    insertNode(this.root, newNode);
  }

  deleteItem(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (root === null) return null;

    if (value < root.data) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (root.left === null && root.right === null) {
        return null;
      }

      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      root.data = this.findMinValue(root.right);
      root.right = this.deleteNode(root.right, root.data);
    }

    return root;
  }

  findMinValue(node) {
    let minValue = node.data;
    while (node.left !== null) {
      minValue = node.left.data;
      node = node.left;
    }

    return minValue;
  }

  find(value) {
    let current = this.root;

    while (current !== null) {
      if (current.data === value) {
        return current;
      }

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  levelOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Need to pass callback function as an argument');
    }

    let queue = [];
    if (this.root) queue.push(this.root);

    while (queue.length > 0) {
      let currentNode = queue.shift();
      callback(currentNode);

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
  }

  inOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Need to pass callback function as an argument');
    }

    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    }

    traverse(this.root);
  }

  preOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Need to pass callback function as an argument');
    }

    function traverse(node) {
      if (!node) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
  }

  postOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Need to pass callback function as an argument');
    }

    function traverse(node) {
      if (!node) return;
      traverse(node.left)
      traverse(node.right);
      callback(node);
    }

    traverse(this.root);
  }

  height(node) {
    if (!node) return -1;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (!node) return -1;

    let current = this.root;
    let depth = 0;

    while (current !== null) {
      if (node.data === current.data) {
        return depth;
      }

      if (node.data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }

      depth++;
    }

    return -1;
  }

  isBalanced() {
    function checkBalance(node) {
      if (!node) return 0;

      let leftHeight = checkBalance(node.left);
      let rightHeight = checkBalance(node.right);

      if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    }

    return checkBalance(this.root) !== -1;
  }

  getSortedArray() {
    let result = [];
    this.inOrder(node => result.push(node.data));
    return result;
  }

  rebalance() {
    let sortedArray = this.getSortedArray();
    this.root = this.buildTree(sortedArray);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function getRandomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

let randomNumbers = getRandomArray(100);
let tree = new Tree(randomNumbers);

console.log('Tree is balanced:', tree.isBalanced());

console.log('Level-order:');
tree.levelOrder(node => console.log(node.data));

console.log('Pre-order:');
tree.preOrder(node => console.log(node.data));

console.log('Post-order:');
tree.postOrder(node => console.log(node.data));

console.log('In-order:');
tree.inOrder(node => console.log(node.data));

tree.insert(150);
tree.insert(200);
tree.insert(250);
tree.insert(300);
tree.insert(350);

console.log('Tree is balanced after inserting large numbers:', tree.isBalanced());

tree.rebalance();

console.log('Tree is balanced after rebalancing:', tree.isBalanced());

console.log("Level-order after rebalancing:");
tree.levelOrder(node => console.log(node.data));

console.log("Pre-order after rebalancing:");
tree.preOrder(node => console.log(node.data));

console.log("Post-order after rebalancing:");
tree.postOrder(node => console.log(node.data));

console.log("In-order after rebalancing:");
tree.inOrder(node => console.log(node.data));