var React = require('react');
var LocationBox = require('./LocationBox');
var LocationDashboard = require('./LocationDashboard');

var WeatherParent = React.createClass({

  getInitialState: function () {
    return {
      selectedLocation: "",
      searchBoxValue: "",
      weatherData: "",
      locations: []
    };
  },

  stateHandler: function(newState, url, type, data) {
    //set state if the first arg isn't null
    if (newState !== null) {
      this.setState(newState);
    }

    //get weather data if selected Location just changed
    if ("selectedLocation" in newState) {
      console.log('placeId', newState.selectedLocation.placeId);
      $.get('api/weather/location/detail/' + newState.selectedLocation.placeId, function (googleLoc) {
        this.getWeatherData(googleLoc.result)
      }.bind(this));
    }

    //return if a url is not passed (we only want to set state)
    if (!url) return;
    $.ajax({
      type: type,
      url: url,
      contentType: 'application/json',
      // dataType: 'json',
      data: JSON.stringify(data),
      success: function(data){
          if (data.weatherLocations) this.stateHandler({locations: data.weatherLocations})
      }.bind(this)
    });
  },

  componentDidMount: function() {
    /**
    * When the component mounts, get a list of the user's locations
    */
    $.get(this.props.source, function(result) {
      if (this.isMounted()) {
        this.setState({
          locations: result ? result.weatherLocations : []
        });
      }
    }.bind(this));
  },

  componentDidUpdate: function(params) {
    // update event handler
  },

  getWeatherData: function (location) {

    var latLong = location.geometry.location.lat + "," + location.geometry.location.lng
    $.simpleWeather({
      location: latLong,
    	unit: 'f',
    	success: function(weather) {
        this.setState({weatherData: weather});
    	}.bind(this),
    	error: function(error) {
        console.log('weather error', error);
    	}
    }).bind(this);
  },

  render: function () {
    return (
      <div className="row">
        <LocationBox
          locations={this.state.locations}
          stateHandler={this.stateHandler}
          searchBoxValue={this.state.searchBoxValue}
          getWeatherData={this.getWeatherData}
        />
        <LocationDashboard
          weatherData={this.state.weatherData}
        />
      </div>
    )
  }
});

module.exports = WeatherParent;
