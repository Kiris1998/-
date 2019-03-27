class Set {
  constructor () {
    this.dataStore = []
  }
  add(el) {
    if (!this.dataStore.includes(el)) {
      this.dataStore.push(el)
      return true
    } else {
      return false
    }
  }
  remove(el) {
    let index = this.dataStore.indexOf(el)
    if (index > -1) {
      this.dataStore.splice(index,1)
      return true
    } else {
      return false
    }
  }
  show() {
    console.log(this.dataStore.join(' '))
  }
  contains(el) {
    return this.dataStore.includes(el)
  }
  union(set) {
    let temp = new Set()
    this.dataStore.forEach(el => temp.add(el))
    set.dataStore.forEach(el => temp.add(el))
    return temp
  }
}

let test = new Set()
test.add(1)
test.add(1)
test.add(3)
test.add(2)
test.remove(3)
test.show()
let test2 = new Set()
test2.add(5)
test2.add(2)
test2.show
let test3 = test2.union(test)
test3.show()