const express = require('express')
const jwt = require('jwt-simple')
const moment = require('moment')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const jwtauth = require('./middlewares/jwtauth')

const app = express()
global.app = app

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Ca" +
      "che-Control, Expires, Content-Type, X-E4M-With, Authorization, x-access-token")
  // res.header("X-Powered-By", ' 3.2.1')
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("Content-Type", "application/json;charset=utf-8")
  console.log('method >>>', req.method)
  if (req.method == 'OPTIONS') {
    return res.send('')
  }
  next()
})

// 设置密钥
app.set('jwtTokenSecret', 'ly')

// 隐藏 x-powered-by app.disable('x-powered-by') equal app.set('x-powered-by',
// false)
app.set('env', 'production')

app.enable('trust proxy')
app.set('trust proxy', ip => {
  console.log('ip: ', ip)
})

// parse cookie
app.use(cookieParser())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.use(methodOverride())

app.use(jwtauth)

app.all('/', (req, res, next) => {
  console.log('receive /')
  // console.log('headers x-access-token 1111 >>>', req.headers['x-access-token'])
  // console.log(req.headers)
  res.json({success: true, message: '请求成功'})
})

app.all('/token', (req, res, next) => {

  const userId = 22
  // 设置过期时间(七天后过期,毫秒级别)
  const expires = moment()
    .add(7, 'days')
    .valueOf()

  // `jwt.encode` 有两个参数。第一个就是需要加密的对象, 第二个参数是一个加密的密钥。
  const token = jwt.encode({
    iss: userId,
    exp: expires
  }, app.get('jwtTokenSecret'))

  res.setHeader('x-access-token', token)

  // 解密
  const decoded = jwt.decode(token, app.get('jwtTokenSecret'))

  res.json({token: token, expires: expires, userId: userId, decoded})
})

app.listen(3000, () => {
  console.log('Listening at port 3000.')
})