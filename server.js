var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken');
var config = require('./config');
var User   = require('./app/models/user');

//CONFIG
var port = process.env.PORT || 8099; // used to create, sign, and verify tokens

//TODO: Make it so connection is not constant
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

//TODO: move setup function into its own module
app.get('/setup', function(req, res) {

	var sf = new User({ 
		name: 'Shaun Farrell', 
		password: 'password',
		admin: true 
	});
	sf.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
});

//Basic route (http://localhost:8099)
app.get('/', function(req, res) {
	res.send('API is running on http://localhost:' + port + '/api');
});

//PRIVATE
app.use('/api', require('./lib/api.js')());
//PUBLIC
app.use('/about', require('./lib/about.js')());

//START SERVER
app.listen(port);
console.log('Magic happens at http://localhost:' + port);