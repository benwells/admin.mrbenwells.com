var secrets = require('../config/secrets');
var nodemailer = require("nodemailer");
var request = require('request');
var User = require('../models/User');
// var mongoose = require('mongoose');
var async = require('async');
var _ = require('lodash');

var transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: secrets.sendgrid.user,
    pass: secrets.sendgrid.password
  }
});

/**
 * GET /contact
 * Contact form page.
 */
exports.weatherHome = function(req, res) {
  res.render('weather/weather', {
    title: 'Weather'
  });
};

exports.locAutocomplete = function(req, res) {
  var url = [
    "https://maps.googleapis.com/maps/api/place/autocomplete/json?key=",
    secrets.google.placesApiKey,
    "&input=" + req.params['input']
  ].join("");
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    }
  });
};

exports.getLocDetails = function(req, res) {
  var url = [
    "https://maps.googleapis.com/maps/api/place/details/json?placeid=",
    req.params['placeid'],
    '&key=',
    secrets.google.placesApiKey,
  ].join("");
  console.log(url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    }
    else {
      console.log('error', error, body)
    }
  });
};

/**
*
* Retrieves a list of the currently logged in user's locations
*/
exports.getUserLocations = function (req, res) {
  res.json({ weatherLocations: req.user.weatherLocations});
};

exports.addUserLocation = function (req, res) {
  var description = req.body.description;
  var locId = req.body.id;
  var placeId = req.body.place_id;

  var newLocation = { "description": description,
    "locId": locId,
    "placeId" : placeId
  };

  User.findByIdAndUpdate(
    req.user.id,
    {$push: {"weatherLocations": newLocation}},
    {safe: true, upsert: true, new: true},
    function(err, model) {
        if (err) console.log('err', err);
        var data = {
          weatherLocations: model.weatherLocations
        };
        res.json(data);
    }
  );
};

exports.deleteUserLocation = function (req, res) {
  var locId = req.body.id;
  console.log('body', req.body);

  var weatherLocations = User.findOne({_id: req.user.id}).weatherLocations;
  console.log("weatherLocations", weatherLocations);

  User.findByIdAndUpdate(
    req.user.id,
    {$pull: { "weatherLocations": {locId: locId}}},
    {safe: true, upsert: true},
    function(err, model) {
      if (err) res.json({ err: err });

      res.send({ 'status': "success"});
    }
  );
};
