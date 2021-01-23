let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let helmet = require('helmet');


let User = require('./models/user');
let Room = require('./models/room');
let Message = require('./models/message');
let SecretMessage = require('./models/secret_message')

User.sync()
.then(() => { 
	  Room.belongsTo(User, {foreignKey: 'createdBy'});
    Room.sync()
    .then(() => {  
	  	Message.belongsTo(Room, {foreignKey: 'roomId'});
	  	Message.sync();
    })
    .catch(() => {
      console.log("-----------------------------------")
      console.log("Room.sync エラーーー！！")
      console.log("-----------------------------------------")
    })
})
.catch(() => {
  console.log("-----------------------------------")
  console.log("User.sync エラーーー！！！！")
  console.log("-----------------------------------------")
})
SecretMessage.sync()

let session = require('express-session');
let passport = require('passport');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

let indexRouter = require('./routes/index');
let logoutRouter = require('./routes/logout')
let roomRouter = require('./routes/room');
let authRouter = require('./routes/auth');
let createMessageRouter = require('./routes/createMessage')
let deleteMessageRouter = require('./routes/deleteMessage')
let synchronizeMessageRouter = require('./routes/synchronizeMessage')

let app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'e55be81b307c1c09', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/logout', logoutRouter);
app.use('/room', roomRouter);
app.use('/auth', authRouter);
app.use('/createMessage', createMessageRouter)
app.use('/deleteMessage', deleteMessageRouter)
app.use('/synchronizeMessage', synchronizeMessageRouter)



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

module.exports = app;
