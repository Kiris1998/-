//建造者模式
//工厂模式如其名，关注的是工厂的产物而不注重生产的过程
//建造者模式，如其名，就是指工厂中的工人，注重的是建造的过程。
//注重点的不同原因是目标对象创建的复杂度不同（对象属性是否复杂繁多）
// 用于创建一个属性是对象的对象
class Human{
  constructor(param) {
    this.skill = param && param.skill || '保密'
    this.hobby = param && param.hobby || '保密'
  }
  getSkill() {
    return this.skill
  }
  getHobby() {
    return this.hobby
  }
}

class Name{
  constructor(name){
    this.wholeName = name
    if (name.indexOf(' ') > -1) {
      this.firstName = name.slice(0,name.indexOf(' '))
      this.secondName = name.slice(name.indexOf(' '))
    }
  }
}

class Work{
  constructor(work){
    switch(work){
      case 'code':
        this.work = '工程师',
        this.workPlace = '北京'
        break
      case 'teach':
        this.work = '教师'
        this.workPlace = '南京'
        break
      default:
        this.work = work
        this.workPlace = '未知'
    }
  }
  changeWork(work){
    this.work = work
  }
  changeWorkPlace(place){
    this.workPlace = place
  }
}

class Person{
  constructor(name,work){
    let _person = new Human()
    _person.name = new Name(name)
    _person.work = new Work(work)
    return _person
  }
}

let person = new Person('Zhang Jun','code')

console.log(person);