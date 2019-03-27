// 需求时常改变，所以我们需要对常使用类进行加工装饰

let decorator = function(id,event,fn) {
  let el = document.getElementById(id)

  if(typeof el[event] == 'function') {
    let oldFn = el.onclick
    el[event] = function(){
      fn()
      oldFn()
    }
  } else {
    el[event] = fn
  }
}