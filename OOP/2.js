//认识js的对象

// class Book {
//   constructor(id){
//     this.id = id
//   }
//   static print(){
//     console.log('I am a book!')
//   }

// }

// class Novel extends Book {
//   constructor(props,price){
//     super(props)
//     this.price = price
//   }
//   static print(){
//     console.log('I am a novel');
//   }
// }

// Book.print()
// Novel.print()

// let test = new Novel(1,30)
// console.log(test);

//ES5 继承
function Person (name){
  this.name = name
  this.className = 'Person'
}

Person.prototype.getName = function(){
  console.log(this.name)
}
//原型赋值法--------------------------

// function Man (){

// }

// Man.prototype = new Person("Kiris")
// //子类无法通过父类创建私有属性（缺失构造函数）
// let test1 = new Man()
// let test2 = new Man()
// test1.getName()
// test2.getName()

//调用构造函数-------------------------

// function Man (name){
//   Person.apply(this,arguments)
//   this.className = 'Man'
// }
// let man1 = new Man("Kiris")
// //man1.getName() //man1.getName is not a function 无法调用父类原型方法
// console.log(man1)

//组合继承

// function Man (name) {
//   Person.apply(this,arguments)
//   this.className = 'Man'
// }

// Man.prototype = new Person()

// let man = new Man('Kiris')
// man.getName()
// console.log(Man.prototype) //Person { name: undefined, className: 'Person' }
//这种方式虽然实现没有问题，但是有bug，就是原型链上会有父元素的未定义私有属性，而子类对象的属性是通过this创建的，覆盖了而已

//更优雅的继承：寄生组合式

function Man (name) {
  Person.apply(this,arguments)
  this.className = 'Man'
}

Man.prototype = Object.create(Person.prototype) //对传入的对象进行浅拷贝
Man.prototype.constructor = Man
let man = new Man('Kiris')
man.getName()