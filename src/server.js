const ioServer = require('../ioServer')
var express = require('express')
var app = express()
var port = process.env.PORT || 3000

app.set('ioServer', ioServer)

// log all requests
app.use(function timeLog (req, res, next) {
  console.log('%s %s %s %s', Date.now(), req.method, req.url, req.path)
  next()
})

const index = require('./routes/index')
app.use('/', index)

const routes = require('./routes/gpioRoutes')
app.use('/gpio', routes)

app.listen(port)

console.log('ioServer RESTful API started on: ' + port)