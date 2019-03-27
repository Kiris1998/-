// async function test1(){
//   return 'hello async'  //返回一个Promise.resolve('hello async')
// }

// let test = test1()
// test.then((res) => {
//   console.log(res)
//   return new Promise((resolve,reject) => {
//       resolve(123)
//   })
// }).then(res => {
//     console.log(res)
// })

// async function test1(){
//   throw new Error('error')  //返回一个Promise.reject('error')
// }

// let test = test1()
// test.then((res) => {
//   console.log(res)
// })
//     .catch(e => {
//       console.log(e)
//     })

// let a;
// async function f() {
//     await Promise.reject('error');
//     a = await 1; // 这段 await 并没有执行
// }
// f().then(v => console.log(a));
// //如上面所示，当 async 函数中只要一个 await 出现 reject 状态，则后面的 await 都不会被执行。
// // 正确的写法
// let a;
// async function correct() {
//     try {
//         await Promise.reject('error')
//     } catch (error) {
//         console.log(error);
//     }
//     a = await 1;
//     return a;
// }

// correct().then(v => console.log(a)); // 1

let getInfo = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('hahahahaha')
    }, 3000);
})

async function printInfo() {
    let info = await getInfo
    
    console.log(info)
}

printInfo()