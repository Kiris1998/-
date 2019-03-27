//总体思路：使用数组来模拟列表，通过构建类来实现列表的操作。对数组的基本操作进行封装实现列表属性与数组操作的绑定关系。
//通过使用pos属性模拟指针实现列表的滑动访问

class List {
  constructor() {
    this.listSize = 0
    this.pos = 0
    this.dataStore = []
    this.clear = clear
    this.find = find
    this.toString = toString
    this.insert = insert
    this.append = append
    this.remove = remove
    this.front = front
    this.end = end
    this.prev = prev
    this.next = next
    this.length = length
    this.currPos = currPos
    this.moveTo = moveTo
    this.getElement = getElement
    this.contains = contains
  }
}
let append = function (el) {
  this.dataStore[this.listSize++] = el
}
let find = function (el) {
  return this.dataStore.findIndex((v) => v == el)
}

let remove = function (el) {
  let index = this.find(el)
  if (index > -1) {
    this.dataStore.splice(index,1)
    --this.listSize
    return true
  } else {
    return false
  }
}

let length = function () {
  return this.listSize
}

let toString = function () {
  return this.dataStore.join(' ')
}

let insert = function (el,after) {
  let index = this.find(after)
  this.dataStore.splice(index,0,el)
  this.listSize++
  return true
}

let clear = function () {
  delete this.dataStore
  this.dataStore = []
  this.listSize = 0
  this.pos = 0
}

let contains = function (el) {
  return this.dataStore.find((v) => v == el)
}

let front = function () {
  this.pos = 0
}

let end = function () {
  this.pos = this.listSize - 1
}

let prev = function () {
  if (this.pos > 0) {
    this.pos--
  }
}

let next = function () {
  if (this.pos < this.listSize) {
    this.pos++
  }
}

let currPos = function () {
  return this.pos
}

let moveTo = function (position) {
  this.pos = position
}

let getElement = function () {
  return this.dataStore[this.pos]
}
let test = new List()

test.append(2)
test.append(3)
test.append(1)
test.insert(4,1)

console.log(test.currPos())
test.next()
console.log(test.currPos())
test.prev()
console.log(test.pos)
console.log(test.getElement())