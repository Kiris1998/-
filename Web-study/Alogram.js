// 1、回文的判断
// function check(str) {
//   return str === str.split('').reverse().join('')
// }
// console.log(check('abac'))

// 2、数组去重
// let arr = [1,2,3,4,4,3,5]
// (1)、利用Set
// arr = [...new Set(arr)]

// (2)、利用Map
// const temp = new Map()
// arr = arr.filter(item => !temp.has(item) && temp.set(item,1))

// (3)、利用object
// function unique (arr) {
//   let obj = {}
//   let temp = []
//   arr.forEach(item => {
//     if (!obj[item]) {
//       temp.push(item)
//       obj[item] = 1
//     } else {
//       obj[item]++
//     }
//   })
//   return temp
// }

// (4)、利用indexOf
// arr = arr.filter((item,index) => arr.indexOf(item) === index)
// console.log(arr)

// (5)、利用reduce方法
// let arr = [1,2,3,4,4,3,5]
// arr = arr.reduce((last,now) => {
//         last.length == 0 && last.push(now)
//         !last.find(item => item == now) && last.push(now)
//         return last
//       },[])
// console.log(arr)
// 3、字符串出现次数最多的字母
// let str = 'asdasbfhjsdgfhjksdgdfjks'
// let obj = {}
// str = str.split('')
// let max = str[0]
// str.forEach(item => {
//   if (!obj[item]) {
//     obj[item] = 1
//   }
//   else {
//     obj[item]++
//     if (obj[item] > obj[max]) max = item
//   }
// })
// console.log(max)

// 4、不使用临时变量交换两个数的值

// function swap (a,b) {
//   b = a - b // 存差
//   a = a - b
//   b = a + b
// }

// 5、数组乱序
// var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// arr.sort(function () {
//     return Math.random() - 0.5; // 大于0.5返回正值不交换，小于0.5返回负值，要打乱、缺点，打乱不彻底
//     // 还是因为排序算法的不稳定性，导致一些元素没有机会进行比较
// });

// function shuffle(arr) {   // 洗牌算法
//   let length = arr.length,
//       r      = length,
//       rand   = 0;

//   while (r) {     // r表示当前准备交换的元素，从尾巴开始
//       rand = Math.floor(Math.random() * r--); // 在尾巴元素与第一个元素之间选择一个index
//       [arr[r], arr[rand]] = [arr[rand], arr[r]];  // 超级神奇的交换算法！！！！！
//   }

//   return arr;
// }

// // 6、数组拆解: flat: [1,[2,3]] --> [1, 2, 3]
// Array.prototype.flat = function() {
//   this.toString().split(',').map(item => +item )
// }

// arr.flat(Infinity)
// 实现
// let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]

// const flatten = function (arr) {
//     while (arr.some(item => Array.isArray(item))) {
//         arr = [].concat(...arr)
//     }
//     return arr
// }

// // 7、随机字符串
// function randomString(n){
//   let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
//   let tmp = '',i=0,l=str.length;
//   for(i=0;i<n;i++){
//       tmp+=str.charAt(Math.floor(Math.random()*l))
//   }
// }

// // 8、首字母大写
// str.slice(0,1).toUpperCase() + str.slice(1)
