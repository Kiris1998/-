class CArray {
  constructor(size){
    this.pos = 0
    this.size = size
    this.dataStore = []
    for(let i = 0;i < size;i++) {
      this.dataStore[i] = Math.floor(Math.random() * 100)
    }
  }
  insert(el) {
    this.dataStore[this.size++] = el
  }
  toString() {
    console.log(this.dataStore.join(' '))
  }
  swap(index1,index2) {
    let temp = this.dataStore[index1]
    this.dataStore[index1] = this.dataStore[index2]
    this.dataStore[index2] = temp
  }
  bubbleSort() {
    for (let i = 0;i < this.dataStore.length - 1;i++) {
      for (let j = 0;j < this.dataStore.length - 1 - i;j++) {
        if (this.dataStore[j] > this.dataStore[j+1])
          this.swap(j,j+1)
      }
      this.toString()
    }
  }
  selectSort() {
    for(let i = 0;i < this.dataStore.length - 1;i++) {
      let k = i
      for(let j = i + 1;j < this.dataStore.length;j++) {
        if (this.dataStore[j] < this.dataStore[k]) {
          k = j
        }
      }
      this.swap(i,k)
      this.toString()
    }
  }
  insertSort() {
    for(let i = 1;i < this.dataStore.length;i++){
      if(this.dataStore[i] < this.dataStore[i-1]){
        let temp = this.dataStore[i]
        let j = i
        while(j > 0 && this.dataStore[j-1] > this.dataStore[i]) {
          this.dataStore[j] = this.dataStore[j-1]
          j--
        }
        this.dataStore[j] = temp
      }
      this.toString()
    }
  }
  quickSort(arr){
    if(arr.length == 0) return []
    let lesser = []
    let greater = []
    let pos = arr[0]
    for(let i = 1;i < arr.length;i++) {
      if (arr[0] > arr[i]) lesser.push(arr[i])
      else greater.push(arr[i])
    }
    return this.quickSort(lesser).concat(pos,this.quickSort(greater))
  }
}

let test = new CArray(23)
test.toString()
test.dataStore = test.quickSort(test.dataStore)
test.toString()