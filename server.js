var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
// 
// var notesCss = require('views\Css\Notes.css');
var configDB = require(__dirname + '/config/database.js');

mongoose.connect(configDB.url); // connect to database
var Note = require(__dirname + "/app/models/note");
var db = mongoose.connection;
var ObjectId = mongoose.Types.ObjectId;
require('./config/passport')(passport);

app.use(express.static(__dirname + '/'));
app.use(morgan('dev'));
app.use(cookieParser('ilovescotchscotchyscotchscotch'));
app.use(bodyParser());

app.set('view engine', 'ejs');

// required for passport
app.use(session({ 
	secret: 'ilovescotchscotchyscotchscotch',
	resave: false,
	saveUninitialized : true,
	cookie : {
		expires : false
	}
	})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// routes
require('./app/routes.js')(app, passport, Note, db, ObjectId);

app.listen(port);
console.log('Server started on port ' + port);
