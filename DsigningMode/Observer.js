let Obserevr = (function(){
  let __message = {}
  return{
    regist: function (type,fn) {
      if(typeof __message[type] === 'undefined') {
        __message[type] = [fn]
      } else {
        __message[type].push(fn)
      }
    }, //注册信息
    fire: function (type,args) {
      if (!__message[type]) {
        return;
      }
      let events = {
        type,
        args: args || {}
      }
      __message[type].forEach(element => {
        element.call(this,events)
      });
    },   //发布信息
    remove: function (type,fn) {
      if(__message[type] instanceof Array) {
        for (let i = __message[type].length;i > 0;i--) {
          __message[type][i] === fn && __message[type].splice(i,1)
        }
      }
    }  //移除信息
  }
})()

class Student{
  constructor (result) {
    this.result = result
  }
  say () {
    console.log(this.result)
  }
  answer (question) {
    Obserevr.regist(question,this.say)
  }
  sleep (question) {
    console.log(this.result + ' ' + question + ' 已被注销')
    Obserevr.remove(question,this.say)
  }
}

class Teacher{
  constructor(){}
  ask (question) {
    console.log(`Question is ${question}`)
    Obserevr.fire(question)
  }
}

let stu1 = new Student('no1 answer')
let stu2 = new Student('no2 answer')
let stu3 = new Student('no3 answer')

stu1.answer('a')
stu1.answer('b')
stu2.answer('a')
stu3.answer('a')
stu3.sleep('a')

let teacher = new Teacher()
teacher.ask('a')
teacher.ask('b')

