class Fruit{
  constructor(){
    this.name = "fruitName"
  }
  showName(){
    console.log(this.name)
  }
}

class Apple extends Fruit{
  constructor(){
    super()
    this.name = "apple"
  }
}

class Orange extends Fruit{
  constructor(){
    super()
    this.name = "Orange"
  }
}

class Banana extends Fruit{
  constructor(){
    super()
    this.name = "Banana"
  }
}
//简单工厂模式
// 1、通过类实例化实现
// let FruitFactory = function(name) {
//   switch(name) {
//     case 'Apple' :
//       return new Apple()
//     case 'Orange' :
//       return new Orange()
//     case 'Banana' :
//       return new Banana()
//   }
// }

// let test = FruitFactory('Apple')
// test.showName()
//2、通过创建一个新的对象包装增强属性与功能

// let CreateFruit = function(name){
//   let o = new Object()
//   o.name = name
//   switch(name) {
//     case 'Apple' :
//       o.color = 'red'
//       break
//     case 'Orange' :
//       o.counts = 12
//       break
//     case 'Banana' :
//       o.price = 3
//       break
//   }
//   return o
// }

// let apple = CreateFruit('Apple')
// let orange = CreateFruit('Orange')

// console.log(apple);
// for (const key in apple) {
//   if (apple.hasOwnProperty(key)) {
//     const element = apple[key];
//     console.log(element)
//   }
// }

// for (const key in orange) {
//   if (orange.hasOwnProperty(key)) {
//     const element = orange[key];
//     console.log(element)
//   }
// }

//3、当我们的需求时常需要改变时，我们就一直需要去修改上述的工厂方法
//对于这种情况，我们可以使用工厂方法

let FruitFactory = function(name){
  if(this instanceof FruitFactory)
    return new this[name]()
  else
    return new FruitFactory(name)
}

FruitFactory.prototype = {
  Apple: function() {
    this.name = 'apple'
  }
}

let apple = FruitFactory('Apple')
console.log(apple)

//4、抽象工厂

let AbstractFactory = function(subType,superType){
  if(typeof AbstractFactory[superType] === 'function') {
    function F() {
      F.prototype = new AbstractFactory[superType]()
      subType.constructor = subType
      subType.prototype = new F()
    }
  }
}

AbstractFactory.Car = function() {
  this.type = 'car'
}

AbstractFactory.Car.prototype = {
  getPrice() {
    return new Error('ab')
  }
}

let BYD = function(price) {
  this.price = price
}

AbstractFactory(BYD,'Car')
BYD.prototype.getPrice = function(){
  console.log(this.price)
}

let test2 = new BYD(123)
test2.getPrice()