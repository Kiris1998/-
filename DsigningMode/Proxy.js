// 代理模式
// 代理送花
// let flower = 'I am a flower'

// let Kiris = {
//   sendFlower() {
//     B.getFlower(flower)
//   }
// }

// let B = {
//   getFlower(flower){
//     A.changeMood(()=>{
//       A.getFlower(flower)
//     })
//   }
// }

// let A = {
//   getFlower(flower){
//     console.log('A get ' + flower);
//   },
//   changeMood(fn){
//     setTimeout(()=>{
//       fn.apply(this,arguments)
//     },2000)
//   }
// }

// Kiris.sendFlower()

//虚拟代理

// let myImage = (function(){
//   let imgNode = document.createElement("img")
//   document.body.appendChild(imgNode)
//   return {
//     setSrc(src){
//       this.imgNode.src = src
//     }
//   }
// })()

// let proxyImg = (function(){
//   let img = new Image()  // 先看这儿
//   img.onload = function(){
//     myImage.setSrc(this.src)  //最后看这儿
//   }
//   return{
//     setSrc(src){
//       myImage.setSrc("loading.png") // 再看这儿
//       this.img.src = src
//     }
//   }
// })()

function test(){
  console.log(Array.prototype.join.call(arguments, ","));
  console.log(arguments);
}

test(1,2,3,4)