import mongoose from 'mongoose'

const db = mongoose.connect("mongodb://localhost/testDB") //mongodb连接
let UserSchema = new mongoose.Schema({
  username: String,
  age: Number
})  //创建集合数据模型

let User = mongoose.model('User',UserSchema)  //模型实例化

// let user = {
//   username: 'Kiris',
//   age: 19
// }                 //Instantiate a data
// let userData = new User(postData)  数据实例化

export default User