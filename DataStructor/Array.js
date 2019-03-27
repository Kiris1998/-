//reduce函数的使用

// const arr = [1,2,3,4,5]

// function sum (laterSum,item) {
//   console.log(laterSum)
//   return laterSum + item
// }

// let result = arr.reduce(sum)

// console.log(result)

//二维数组

// Array.matrix = function (rowNum,colNum,Init) {
//   let arr = []
//   for (let i = 0;i < rowNum;i++) {
//     let colArr = []
//     for (let j = 0;j < colNum;j++) {
//       colArr[j] = Init
//     }
//     arr[i] = colArr
//   }
//   return arr
// }

// let test = Array.matrix(5,5,1)
// console.log(test[1][2])

// let grade = [[89,92,67],[33,99,80],[100,100,100]]

// for (let i = 0;i < grade.length;i++) {
//   let total = 0
//   let avrage = 0
//   for (let j = 0;j < grade[i].length;j++) {
//     total = total + grade[i][j]
//     avrage = total/grade[i].length
//   }
//   console.log(`The total of NO.${i} is ${total},and the avrage is ${avrage}`)
// }

// class Student {
//   constructor(grades) {
//     this.grades = grades
//   }
//   getAvarage () {
//     let sum = this.grades.reduce((laterSum,item) => {
//       return laterSum + item
//     })
//     return sum/this.grades.length
//   }
// }

// let Kiris = new Student([122,34,3])
// console.log(Kiris.getAvarage())

// let words = [1,2,3,4,5]

// words.forEach((item) => {
//   console.log(item)
// })

// words.reverse().forEach((item) => {
//   console.log(item)
// })

