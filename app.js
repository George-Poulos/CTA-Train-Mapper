let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let users = require('./routes/users');

let getTrainJSON = require('./Services/GetCTAJSON');

let app = express();

global.apiKey = process.env.apiKey;
global.URL = process.env.URL;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.use('/getBlueLine', function(req,res){
    getTrainJSON(res,"blue");
});
app.use('/getRedLine', function(req,res){
    getTrainJSON(res,"red");
});
app.use('/getBrownLine', function(req,res){
    getTrainJSON(res,"brn");
});
app.use('/getPinkLine', function(req,res){
    getTrainJSON(res,"pink");
});
app.use('/getGreenLine', function(req,res){
    getTrainJSON(res,"g");
});
app.use('/getOrangeLine', function(req,res){
    getTrainJSON(res,"org");
});
app.use('/getPurpleLine', function(req,res){
    getTrainJSON(res,"p");
});
app.use('/getYellowLine', function(req,res){
    getTrainJSON(res,"y");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
