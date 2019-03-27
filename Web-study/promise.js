class Promise {
  constructor (executor) {      //excutor = function(resolve,reject){$.get(url,data => resolve(data))}
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    let resolve = (data) => {           //是为了用于传递数据给then方法的
      if (this.status === 'pending') {
        this.status = 'resolve'
        this.value = data
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = (data) => {
      if (this.status === 'pending') {
        this.status = 'reject'
        this.reason = data
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve,reject)
    } catch (e) {
      reject(e)
    }
    then = (onFufilled,onRejected) => {
      onFufilled = typeof(onFufilled) === 'function' ? onFufilled : y => y
      onRejected = typeof(onRejected) === 'function' ? onRejected : err => {throw(err)}
      let promise2 //作为then的返回值
      if (this.status === 'resolve') {
        promise2 = new Promise((resolve,reject) => {
          setTimeout(() => {      //因为Promise本身是一个异步方法，属于微任务一列，必须得在执行栈执行完了在去取他的值，所以所有的返回值都得包一层异步setTimeout。
            try{
              let x = onFufilled(this.value)
              //因为有的时候需要判断then中的方法是否返回一个promise对象，所以需要判断
              //如果返回值为promise对象，则需要取出结果当作promise2的resolve结果
              //如果不是，直接作为promise2的resolve结果
              //抽离出一个公共方法来判断他们是否为promise对象
              resolvePromise(promise2,x,resolve,reject)
            } catch (e) {
              reject(e)
            }
          },0)
        })
      }
      if (this.status === 'reject') {
        promise2 = new Promise((resolve,reject) => {
          setTimeout(() => {
            try{
              let x = onRejected(this.reason)
              resolvePromise(promise2,x,resolve,reject)
            } catch (e) {
              reject(e)
            }
          },0)
        })
      }
      if (this.status === 'pending') {        //处理异步操作   将后续操作加入回调队列等待执行
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try{
              let x = onFufilled(this.value)
              resolvePromise(promise2,x,resolve,reject)
            } catch (e) {
              reject(e)
            }
          },0)
          
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try{
              let x = onRejected(this.reason)
              resolvePromise(promise2,x,resolve,reject)
            } catch (e) {
              reject(e)
            }
          },0)
        })
      }
      return promise2
    }
    function resolvePromise(promise2,x,resolve,reject) {
      //判断x与promise2的关系
      //因为promise2是上一个promise.then后的返回结果，所以如果相同，会导致下面的.then会是同一个promise2，一直都是，没有尽头
      if(x === promise2){//相当于promise.then之后return了自己，因为then会等待return后的promise，导致自己等待自己，一直处于等待
        return reject(new TypeError('循环引用'))
      }
      if(x !== null && (typeof(x) === 'function' || typeof(x) === 'object')) {
        let called  //called变量主要是用来判断如果resolvePromise函数已经resolve或者reject了，那就不需要在执行下面的resolce或者reject。
        try {
          let then = x.then   //为什么取then这个属性？：因为我们需要去判断x是否为Promise，
                              //then属性如果为普通值，就直接resolve掉，如果是个function，
                              //就是Promise对象，之后我们就需要将这个x的then方法进行执行，用call的原因是因为then方法里面this指向的问题。
          if (typeof(then) === 'function') {
            then.call(x, y=> {
              if(called) return;
              called = true
              //因为可能promise中还有promise，所以需要递归
              resolvePromise(promise2,y,resolve,reject)
            },err => {
              if(called) return;
              called = true
              //一次错误就直接返回
              reject(err)
            })
          } else {
            resolve(x)
          }
        } catch (e) {
          if(called) return;
          called = true
          reject(e)
        }
      } else {
        //这里返回的是非函数，非对象的值,就直接放在promise2的resolve中作为结果
        resolve(x)
      }
    }
  }
}

