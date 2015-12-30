var express = require('express');

function usersRoute() {
	var users = new express.Router();

	users.get('/', function(req, res) {
		User.find({}, function(err, users) {
			res.json(users);
		});
	});

  	return users;
}

module.exports = usersRoute;