// class EventEmitter {
//   constructor(){
//     this.queue = {}
//     this.onceQueue = {}
//   }
//   on(event,fn){
//     if (!this.queue[event]) {
//       this.queue[event] = []
//     }
//     this.queue[event].push(fn)
//   }
//   once(event,fn){
//     if (!this.queue[event]) {
//       this.queue[event] = {
//         fns: [],
//         hasFired: false
//       }
//     }
//     this.onceQueue[event].fns.push(fn)
//   }
//   emit(){
//     let event = [...arguments].shift()
//     let fns = this.queue[event]
//     let onceFns = this.onceQueue[event].fns
//     if(fns && fns.length != 0) {
//       fns.forEach(fn => {
//         fn.apply(this,arguments)
//       })
//     }
//     if(onceFns && onceFns.length != 0 && !this.onceQueue[event].hasFired) {
//       onceFns.forEach(fn => {
//         fn.apply(this,arguments)
//       })
//     }
//     this.onceQueue[event] = {}
//   }
// }

const state = {
  btnText: '未下发任务',
  tableData: [],
  filteredInfo: null,
  rowInfo: null,
  filters: {
    priority: null,
    productionLine: null,
    createTime: null,
    beginTime: null,
    endTime: null,
    doingStatus: null
  }
}
console.log(...state)