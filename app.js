const express = require('express')
const path = require('path')
// const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const session = require('express-session')
const index = require('./routes/index')
const app = express()
const { CartController } = require('./controllers/CartController')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')))

// res.locals is an object passed to hbs engine
app.use(function (req, res, next) {
  res.locals.session = req.session
  next()
})

app.use('/', index)

app.use(CartController.err)

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
