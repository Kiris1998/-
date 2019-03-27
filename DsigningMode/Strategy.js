//策略模式
//在策略模式以前介绍下很简单的状态模式
//状态模式就是一种分支管理方式，比较高级的分支管理我们可以使用数组，对象来进行管理
//策略模式和状态模式所实现的功能很像，但是策略模式的“策略”是相互独立的，实现的是对每一种事件实现不同的处理

let PriceStragtegy = function () {
  let stragtegy = {
    return30: function(price) {
      return +price + parseInt(price / 100) * 30
    },
    percent90: function(price) {
      return price * 100 * 90 / 10000
    }
  }
  return function(algorithm,price){
    return stragtegy[algorithm] && stragtegy[algorithm](price)
  }
}()

let InputStrategy = function() {
  let stragtegy = {
    notNull(value) {
      return /\s+/.test(value) ? '请输入内容' : ''
    },
    number(value) {
      return /^[0-9]+(\.[0-9]+)?$/.test(value) ? '' : '请输入数字'
    }
  }
  return{
    check(type,value) {
      value = value.replace(/^\s+|\s+$/g,'')
      return stragtegy[type] ? stragtegy[type](value) : 'No This Method'
    },
    addStrategy(type,fn) {
      stragtegy[type] = fn
    }
  }
}