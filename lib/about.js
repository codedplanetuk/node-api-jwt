var express = require('express');
var bodyParser = require('body-parser');

function aboutRoute() {
  var about = new express.Router();
  about.use(bodyParser());

  // GET REST endpoint - query params may or may not be populated
  about.get('/', function(req, res) {
    res.json({msg: 'Version: 0.0.1'});
  });

  return about;
}

module.exports = aboutRoute;
