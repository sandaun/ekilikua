require('dotenv').config();

const createError = require('http-errors');
const flash = require('connect-flash');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

// notifications handle
// const { notifications } = require('./assets');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// mongodb connect
// (async () => {
//   try{
//     await mongoose.connect(`${process.env.MONGODB_URI}${process.env.MONGODB_NAME}`, { useNewUrlParser: true });
//     console.log(`Conected to ${process.env.MONGODB_NAME}`);
//   }catch{
//     err => {
//       console.error(`Error conecting to ${process.env.MONGODB_NAME}. `, err);
//     }
//   }
// })();N

const app = express();

// app title
// app.locals.title = "";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

// middlewares
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session({
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     ttl: 24 * 60 * 60, // 1 day
//   }),
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000,
//   },
// }));
// app.use(flash());
// app.use((req, res, next) => {
//   // app.locals.currentUser = req.session.currentUser;
//   res.locals.currentUser = req.session.currentUser;
//   next();
// });
// app.use(notifications);
// app.use(sassMiddleware({
//   /* Options */
//   src: __dirname,
//   dest: path.join(__dirname, 'public'),
//   debug: true,
//   outputStyle: 'compressed',
//   prefix: '/prefix', // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
// }));
app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
