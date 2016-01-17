var ReactDOM = require('react-dom');
var React = require('react');
var WeatherParent = require('./WeatherParent');

var reactComponent = ReactDOM.render(
  <WeatherParent
    source="/api/weather/locations/get"
    delUrl="/api/weather/locations/delete"
  />,
  document.getElementById('weatherParent')
)
// var reactComponent = ReactDOM.render(
//   <LocationBox
//   source="/api/weather/locations/get"
//   delUrl="/api/weather/locations/delete"
//   />,
//   <LocationDashboard/>,
//   document.getElementById('locationCol')
// )
