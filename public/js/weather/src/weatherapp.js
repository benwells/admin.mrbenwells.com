var ReactDOM = require('react-dom');
var React = require('react');
var LocationBox = require('./LocationBox');

var reactComponent = ReactDOM.render(
  <LocationBox source="/api/weather/locations/get"/>,
  document.getElementById('locationCol')
)
