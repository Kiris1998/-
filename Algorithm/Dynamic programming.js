//　动态规划的一种变形，使用自顶向下的策略，更像递归算法。
//初始化时表中填入一个特殊值表示待填入，当递归算法第一次遇到一个子问题时，计算并填表；以后每次遇到时只需返回以前填入的值。

//1、斐波那契数列的动态规划解法
// function DyFib (n) {
//   let arr = []
//   if (n == 1 || n == 2) return 1
//   else {
//     arr[1] = 1
//     arr[0] = 0
//     for(let i = 2;i <= n;i++){
//       let temp = arr[i-1] + arr[i-2]
//       arr.push(temp)
//     }
//     return arr[n]
//   }
// }
// console.log(DyFib(5))

//2、最长公共子串问题

// function LCS(str1,str2) {
//   let maxLen = 0
//   let index = 0
//   let arr = new Array()
//   for(let i = 0;i < str1.length + 1;i++){
//     arr[i] = new Array()
//     for(let j = 0;j < str2.length + 1;j++){
//       arr[i][j] = 0
//     }
//   }
//   for(let i = 0;i < str1.length;i++){
//     for(let j = 0;j < str2.length;j++){
//       if(i == 0 || j == 0) arr[i][j] = 0
//       else{
//         if (str1[i] == str2[j] && str1[i-1] == str2[j-1]) arr[i][j] = arr[i-1][j-1] + 1
//         else arr[i][j] = 0
//       }
//       if(arr[i][j] > maxLen) {
//         maxLen = arr[i][j] + 1
//         index = i - maxLen + 1
//       }
//     }
//   }
//   console.log(maxLen);
//     let str = ''
//     for(let i = index;i < maxLen + index;i++) {
//       str += str1[i]
//     }
//     return str
// }

// console.log(LCS('abcdefg','xyzabcd'))

//3、背包问题

function max(a,b){
  return (a > b) ? a :b
}

function dKnapsack(capacity,size,value,n){
  let K = []
  for(let i = 0;i <= capacity + 1;i++) {
    K[i] = []
  } //初始化记录不同方案的价值的数组
  for(let i = 0;i <= n;i++){
    for(let w = 0;w <= capacity;w++){
      if(i == 0 || w == 0){
        K[i][w] = 0
      } else if(size[i-1] <= w) { //如果背包剩余的空间够放w重量的物品
        K[i][w] = max(value[i-1] + K[i-1][w-size[i-1]],K[i-1][w])
      } else {
        K[i][w] = K[i-1][w]
      }
      console.log(K[i][w] + " ")
    }
  }
  return K[n][capacity]
}

let val = [4,5,10,11,13]
let size = [3,4,7,8,9]
let capacity = 16
let n = 5
dKnapsack(capacity,size,val,n)
