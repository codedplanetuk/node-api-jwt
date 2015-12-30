var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
//TOOD hash the password.
module.exports = mongoose.model('User', new Schema({ 
	name: String, 
	password: String, 
	admin: Boolean 
}));