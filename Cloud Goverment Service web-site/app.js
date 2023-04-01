var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();

global.registration = {
  status: 'new',
  current_page: 1
}

var authRouter = require('./routes/auth');
var logout = require('./routes/logout');
var uausersRouter = require('./routes/uk-UA/users');
var ruusersRouter = require('./routes/ru-RU/users');
var enusersRouter = require('./routes/en-US/users');
var authRouter = require('./routes/auth');
var enindexRouter = require('./routes/en-US/index');
var uaindexRouter = require('./routes/uk-UA/index');
var ruindexRouter = require('./routes/ru-RU/index');
var signup = require('./routes/signup');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('strict routing', false);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/en-US/home', enindexRouter);
app.use('/uk-UA/home', uaindexRouter);
app.use('/ru-RU/home', ruindexRouter);
app.use('/ru-RU/profile', ruusersRouter);
app.use('/uk-UA/profile', uausersRouter);
app.use('/en-US/profile', enusersRouter);
app.use('/', authRouter);
app.use('/logout', logout);
app.use('/signup', signup);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



global.language = null

global.middlename = {ua: "", ru: '', en: ''}
global.uname = {ua: "", ru: '', en: ''}
global.lastname = {ua: "", ru: '', en: ''}
global.dayofbirth = ''
global.nationality = {ua: "", ru: '', en: ''}
global.docnum = ''
global.dateex = ''
global.dateiss = ''
global.kem = {ua: "", ru: '', en: ''}
global.itn = ''
global.sexText = {ua: "", ru: '', en: ''}



module.exports = app;
