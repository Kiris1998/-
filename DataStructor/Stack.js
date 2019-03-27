class Stack {
  constructor () {
    this.dataStore = []
    this.pop = pop
    this.push = push
    this.peek = peek
    this.length = length
    this.clear = clear
    this.top = 0
  }
}

let push = function (el) {
  this.dataStore[this.top++] = el
}

let pop = function () {
  return this.dataStore[--this.top]
}

let peek = function () {
  return this.dataStore[this.top - 1]
}

let length = function () {
  return this.top
}

let clear = function () {
  this.top = 0
}

function mulBase (num,base) {
  let s = new Stack()
  let result = ''
  do {
    s.push(num % base)
    num = Math.floor(num / base)
  } while (num > 0)
  while (s.top != 0) {
    result = result + s.pop()
  }
  console.log(result)
}

mulBase(1,2)

export default {Stack}

