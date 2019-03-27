function Apple(name){
  this.name = name
}
Apple.prototype.print = function () {
  console.log(this.name)
}
function init(){
  let obj = {}
  let myConstructor = [].shift.call(arguments)  //获得构造函数
  obj.__proto__ = myConstructor.prototype //原型链接
  myConstructor.apply(obj,arguments)  //绑定this，实现继承，使得obj可以访问构造函数中的属性
  return obj
}