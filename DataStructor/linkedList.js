class Node {
  constructor (el) {
    this.elment = el
    this.next = null
  }
}

class LList {
  constructor () {
    this.head = new Node('head')
  }
  find(item) {
    let current = this.head
    while (current != null && current.elment != item) {
      current = current.next
    }
    return current
  }
  findPre(item) {
    let current = this.head
    while (current != null && current.next.elment != item) {
      current = current.next
    }
    return current
  }
  insert(newEl,item) {
    let current = this.find(item)
    let newNode = new Node(newEl)
    newNode.next = current.next
    current.next = newNode
  }
  display() {
    let current = this.head
    while(current.next != null) {
      console.log(current.next.elment)
      current = current.next
    }
  }
  remove(item) {
    let preNode = this.findPre(item)
    preNode.next = preNode.next.next
  }
}

let test = new LList()
test.insert(1,'head')
test.insert(2,'head')
test.insert(3,'head')
test.remove(2)
test.insert(4,'head')
test.display()