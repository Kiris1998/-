let originObj = {
  childObj: {
    name: 'Kiris',
    children: {
      age: 18
    }
  }
}

let copy1 = Object.assign({},originObj)  //一级属性深拷贝，二级属性浅拷贝
copy1.childObj = 'Zun'
console.log(originObj)
console.log(copy1)