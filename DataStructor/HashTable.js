class HashTable {
  constructor () {
    this.table = new Array(137)
  }
  hash(string) {
    const H = 37
    let total = 0
    for (let i = 0;i < string.length;i++)
      total = total + total * H + string.charCodeAt(i)
    total = total % this.table.length
    return parseInt(total)
  }
  put(data) {
    let index = this.hash(data)
    this.table[index] = data
  }
  display() {
    for (let i = 0;i < this.table.length;i++) {
      if (this.table[i] !== undefined) console.log(i,this.table[i]) 
    }
  }
  get
}

let test = new HashTable()

test.put('sad')
test.put('asdsa')
test.put('asdadw')
test.display()