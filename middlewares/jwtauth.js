const jwt = require('jwt-simple')
// 权限验证中间件

module.exports = function (req, res, next) {
  const token = (req.body && req.body['x-access-token']) || (req.query && req.query['x-access-token']) || req.headers['x-access-token']

  console.log('headers x-access-token >>>', req.headers['x-access-token'])
  console.log('body x-access-token >>>', req.body['x-access-token'])
  if (!!token) {
    try {
      const decoded = jwt.decode(token, app.get('jwtTokenSecret'))
      console.log('decoded >>>', decoded)
      if (decoded.exp <= Date.now()) {
        res.json({
          code: 400,
          success: false,
          message: 'Access token has expired'
        })
      }
      // your code
    } catch (err) {
      console.log('err >>>', err)
      return next()
    }
  } else {
    next()
  }
}
