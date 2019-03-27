// function shallowClone(obj) {
//   const obj2 = {}
//   for (let i in obj) {
//     if (obj.hasOwnProperty(i)) {
//       obj2[i] = obj[i]
//     }
//   }
//   return obj2
// }
// const oldObj = {
//   a: 1,
//   b: [ 'e', 'f', 'g' ],
//   c: { h: { i: 2 } }
// };

// const newObj = shallowClone(oldObj);
// console.log(newObj.c.h, oldObj.c.h); // { i: 2 } { i: 2 }
// console.log(oldObj.c.h === newObj.c.h); // true

// //--------------------------------------------------

// const obj2 = JSON.parse(JSON.stringify(oldObj)) //序列化和反序列化
// console.log(obj2.c.h, oldObj.c.h); // { i: 2 } { i: 2 }
// console.log(oldObj.c.h === obj2.c.h); // true

// //--------------------------------------------------
// function person(pname) {
//   this.name = pname;
// }

// const Messi = new person('Messi');

// // 函数
// function say() {
//   console.log('hi');
// };

// const oldObj = {
//   a: say,
//   b: new Array(1),
//   c: new RegExp('ab+c', 'i'),
//   d: Messi
// };

// const newObj = JSON.parse(JSON.stringify(oldObj));

// // 无法复制函数
// console.log(newObj.a, oldObj.a); // undefined [Function: say]
// // 稀疏数组复制错误
// console.log(newObj.b[0], oldObj.b[0]); // null undefined
// // 无法复制正则对象
// console.log(newObj.c, oldObj.c); // {} /ab+c/i
// // 构造函数指向错误
// console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: Object] [Function: person]

// const oldObj = {};

// oldObj.a = oldObj;

// const newObj = JSON.parse(JSON.stringify(oldObj));
// console.log(newObj.a, oldObj.a); // TypeError: Converting circular structure to JSON
// //--------------------------------------------------
// 关键在于判断属性是否为稀疏数组、正则、函数、对象
function getRegExp (re) {
  let flags = ''
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
function isType (obj,type) {
  if (typeof(obj) !== 'object') return false
  let typeStr = Object.prototype.toString.call(obj)
  let flag
  switch (type) {
    case 'Array':
      flag = typeStr === '[object Array]'
      break;
    case 'Date':
      flag = typeStr === '[object Date]'
      break;
    case 'RegExp':
      flag = typeStr === '[object RegExp]'
      break;
    default:
      flag = false
      break;
  }
  return flag
}

const typeOperation = (obj) => {
  if (isType(obj, 'Array')) {
    // 对数组做特殊处理
    clone = [];
  } else if (isType(obj, 'RegExp')) {
    // 对正则对象做特殊处理
    clone = new RegExp(obj.source, getRegExp(obj));
    if (obj.lastIndex) clone.lastIndex = obj.lastIndex;
  } else if (isType(obj, 'Date')) {
    // 对Date对象做特殊处理
    clone = new Date(obj.getTime());
  } else {
    // 处理对象原型
    let proto = Object.getPrototypeOf(obj);
    // 利用Object.create切断原型链
    clone = Object.create(proto);
  }
  return clone
}

const deepClone = origin => {
  let origins = []
  let clones = [] // 处理循环引用

  const loopClone = origin => {
    if (origin === null) return null
    if (typeof(origin) !== 'object') return origin

    let clone
    clone = typeOperation(origin) //处理特殊类型的属性表
    let index = origins.indexOf(origin) //查看是否循环引用
    if (index !== -1) return origins[index]
    origins.push(origin)
    clones.push(clone)
    for (let i in origin) {
      // 递归
      clone[i] = loopClone(origin[i]);
    }
    return clone
  }
  return loopClone(origin)
}

function person(pname) {
  this.name = pname;
}

const Messi = new person('Messi');

function say() {
  console.log('hi');
}

const oldObj = {
  a: say,
  c: new RegExp('ab+c', 'i'),
  d: Messi,
};

oldObj.b = oldObj;


const newObj = deepClone(oldObj);
console.log(newObj.a, oldObj.a); // [Function: say] [Function: say]
console.log(newObj.b, oldObj.b); // { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] } { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] }
console.log(newObj.c, oldObj.c); // /ab+c/i /ab+c/i
console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: person] [Function: person]