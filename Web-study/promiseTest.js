// const promise = new Promise((resolve, reject) => {
//   console.log(1)
//   resolve()
//   console.log(2)
// })
// promise.then(() => {
//   console.log(3)
// })
// console.log(4)
//promise构造函数中的代码同步执行
//promise.then中的代码是异步执行的
//1243

// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 1000)
// })
// const promise2 = promise1.then(() => {
//   throw new Error('error!!!')
// })

// console.log('promise1', promise1)
// console.log('promise2', promise2)

// setTimeout(() => {
//   console.log('promise1', promise1)
//   console.log('promise2', promise2)
// }, 2000)
//解释：promise 有 3 种状态：pending、fulfilled 或 rejected。
//状态改变只能是 pending->fulfilled 或者 pending->rejected，状态一旦改变则不能再变。
//上面 promise2 并不是 promise1，而是返回的一个新的 Promise 实例。

console.log(1)
console.log(2)
sleep(1000).then(()=>{
  console.log(3)
})


function pSleep(ms){
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve()
    }, ms);
  })
}

async function sleep(ms) {
  await pSleep(ms)
  //console.log(3)
}
