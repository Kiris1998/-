//Promise.resolve()
//1.传入一个promise对象
let p0 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(100)
  }, 0);
})

let p1 = Promise.resolve(p0)

console.log(p0 === p1) //true 因为向resolve中传入promise对象，其返回值就是promise对象本身

//2.传入thenable对象
//如果传入的 value 本身就是 thenable 对象，返回的 promise 对象会跟随 thenable 对象的状态。
let promise = Promise.resolve($.ajax('/test/test.json'));// => promise对象
promise.then(function(value){
   console.log(value);
});

//3.传入的值是返回一个状态已变成 resolved 的 Promise 对象。
let p1 = Promise.resolve(123); 
//打印p1 可以看到p1是一个状态置为resolved的Promise对象
console.log(p1)
