//讲函数封装在对象中，可以避免变量冲突。

// let test = {
//   a () {
//     console.log('a ')
//     return this
//   },
//   b () {
//     console.log('b ')
//     return this
//   },
//   c () {
//     console.log('c ')
//     return this
//   }
// }
//方法的链式调用
// test.a().b().c()

//函数的链式添加与链式调用
// Function.prototype.addMethod = function (name,fn) {
//   this[name] = fn
//   return this
// }

// let methods = function() {}
// methods.addMethod('a',function(){
//   console.log('a');
//   return this
// }).addMethod('b',function(){
//   console.log('b');
//   return this
// })

// methods.b().a()

//为构造函数动态添加原型属性，需要通过实例化才可以实现
Function.prototype.addMethod = function (name,fn) {
  this.prototype[name] = fn
  return this
}

let Methods = function() {}
Methods.addMethod('a',function(){
  console.log('a');
  return this
}).addMethod('b',function(){
  console.log('b');
  return this
})

let test = new Methods()
test.a().b()