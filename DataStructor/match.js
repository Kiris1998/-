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

// function mulBase (num,base) {
//   let s = new Stack()
//   let result = ''
//   do {
//     s.push(num % base)
//     num = Math.floor(num / base)
//   } while (num > 0)
//   while (s.top != 0) {
//     result = result + s.pop()
//   }
//   console.log(result)
// }

// mulBase(1,2)

let testMachine = new Stack()
let testMachine2 = new Stack()

testMachine.push('{')
testMachine.push('(')
testMachine.push(')')
testMachine.push('}')


let flag = true

for(let j = 0;j < testMachine.length();j++) {
  let temp = testMachine.pop()
  if (temp == ')' || temp == '}') {
    testMachine2.push(temp)
  } else if (temp == '(') {
    if (testMachine2.pop() !== ')') flag = false
  } else if (temp == '{') {
    if (testMachine2.pop() !== '}') flag = false
  }
}

console.log(flag)