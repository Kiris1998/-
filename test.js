// // 本题为考试多行输入输出规范示例，无需提交，不计分。
// var readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//     terminal:false
// });

// function test (str) {
//   let arr = str.split('')
//   let lastItem = ''
//   let count = 0
//   arr.forEach((item,index) => {
//     item == lastItem ? count++ : lastItem = item
//     if (count == 2) {
//       arr.splice(index,1)
//       count = 0
//     } else if (item !== lastItem && arr[index] == arr[index+1] && count == 1) {
//       arr.splice(index,1)
//       count = 0
//     }
//   })
//   return arr.join('')
// }

// var n = -1;// 初始状态为负数，表示还没开始读取
// var cur_line = 0;
// let str = ''
// rl.on('line', function(line){ // javascript每行数据的回调接口
//    if (n < 0) { // 测试用例第一行读取n
//        n = parseInt(line.trim())
//    } else {
//        // 矩阵数据读取
//           var tokens = line.split(' ');
//        for (var i = 0; i < tokens.length; ++i) {
//            str = tokens[i]
//            let str2 = test(str)
//            let str3 = ''
//            while(true){
//              str3 = test(str2)
//              if(str2==str3) break
//              else str2 = str3
//            }
//            str = str2
//            console.log(str)
//        }
//        // 记录当前读取的行数
//        cur_line += 1;
//    }
    
//    // 读取行数结束，如果确定只有一行额外的数据输入，也可以通过cur_line === 1来判断
//    if (n === cur_line) {
//        // 输出结果
       
//        // 重新初始化相关变量
//        n = -1;
//        ans = 0;
//        cur_line = 0;
//    }
// });
function create(letter) {
  var text1 = '<span class="word color'
  var num = parseInt(Math.random()*24,10)
  var text2 = '">'
  var res = text1 + num + text2 + letter + '</span>'
  console.log(res)
}
create('a')