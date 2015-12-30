var express = require('express');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var auth = require('./auth.js');
var User   = require('../app/models/user');

//Private api
function apiRoute() {
  var api = new express.Router();

  api.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
      name: req.body.name
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, req.app.get('superSecret'), {
            expiresInMinutes: 1440 // expires in 24 hours
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }   

      }

    });
  });

  api.use(function(req, res, next) {
    auth.checkAuthToken(req, res, next);
  });

  api.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
  });

  api.get('/users', function(req, res) {  
    User.find({}, function(err, users) {
        res.json(users);
    });
  });

  api.get('/check', function(req, res) {
    res.json(req.decoded);
  });

  return api;
}

module.exports = apiRoute;
