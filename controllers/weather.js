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

exports.getUserLocations = function (req, res) {
  res.json({ weatherLocations: req.user.weatherLocations});
};

exports.addUserLocation = function (req, res) {
  var description = req.body.description;
  var locId = req.body.id;
  var newLocation = { "description": description, "locId": locId} ;

  User.findByIdAndUpdate(
    req.user.id,
    {$push: {"weatherLocations": newLocation}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log('err', err);
    }
  );
};

exports.deleteUserLocation = function (req, res) {
  var locId = req.body.id;
  User.findByIdAndUpdate(
    req.user.id,
    {
      $pullAll: { weatherLocations: [ { "locId": locId } ] }
    },
    function(err, model) {
        console.log('err', err);
        console.log('model', model);
    }
  );
};

// /**
//  * POST /contact
//  * Send a contact form via Nodemailer.
//  */
// exports.postContact = function(req, res) {
//   req.assert('name', 'Name cannot be blank').notEmpty();
//   req.assert('email', 'Email is not valid').isEmail();
//   req.assert('message', 'Message cannot be blank').notEmpty();
//
//   var errors = req.validationErrors();
//
//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/contact');
//   }
//
//   var from = req.body.email;
//   var name = req.body.name;
//   var body = req.body.message;
//   var to = 'your@email.com';
//   var subject = 'Contact Form | Hackathon Starter';
//
//   var mailOptions = {
//     to: to,
//     from: from,
//     subject: subject,
//     text: body
//   };
//
//   transporter.sendMail(mailOptions, function(err) {
//     if (err) {
//       req.flash('errors', { msg: err.message });
//       return res.redirect('/contact');
//     }
//     req.flash('success', { msg: 'Email has been sent successfully!' });
//     res.redirect('/contact');
//   });
// };
