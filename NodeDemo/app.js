//通过引入"babel-plugin-transform-es2015-modules-commonjs"插件实现import语法
import Koa from 'koa'
import path from 'path'
import cors from 'koa-cors'
import router from './routers/api'
import bodyparser from 'koa-bodyparser'
import body from 'koa-body'
import koaStatic from 'koa-static'

const app = new Koa()
app.use(bodyparser())        //解决post请求的插件
app.use(body({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}))
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));  // 解决跨域问题

app.use(router.routes())
  //  .use(router.allowedMethods())
const staticPath = './public'
app.use(koaStatic(
  path.join(__dirname,staticPath)
))
app.listen(8080,(ctx) => {
  console.log('Running in 8080')
})