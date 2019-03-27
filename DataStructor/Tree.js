class Node {
  constructor (data,left,right) {
    this.data = data
    this.left = left
    this.right = right
  }
  show () {
    console.log(this.data)
  }
}

class BST {
  constructor () {
    this.root = null
  }
  insert(data) {
    let node = new Node(data,null,null)
    if (this.root === null) {
      this.root = node
    }
    else {
      let current = this.root
      let parent
      while (true) {
        parent = current
        if (data < current.data) {
          current = current.left
          if (current === null) {
            parent.left = node
            break
          }
        } else {
          current = current.right
          if (current === null) {
            parent.right = node
            break
          }
        }
      }
    }
  }
  getMin() {
    let current = this.root
    while(current.left != null) {
      current = current.left
    }
    return current.data
  }
  getMax() {
    let current = this.root
    while(current.right != null) {
      current = current.right
    }
    return current.data
  }
  find(data){
    let current = this.root
    while(current != null) {
      if(current.data == data) {
        return current
      } else if (current.data < data) {
        current = current.right
      } else {
        current = current.left
      }
    }
    return null
  }
}

function inOrder (node) {
  if (node !== null) {
    inOrder(node.left)
    node.show()
    inOrder(node.right)
  }
}

let test = new BST()
test.insert(23)
test.insert(45)
test.insert(16)
test.insert(37)
test.insert(3)
test.insert(99)
test.insert(22)
inOrder(test.root)
console.log(test.getMax())
console.log(test.getMin())
console.log(test.find(12))