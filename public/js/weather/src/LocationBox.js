var React = require('react');
var LocationForm = require('./LocationForm');
var LocationList = require('./LocationList');

var LocationBox = React.createClass({

  handleLocationAdd: function (newLoc) {
    console.log('handleLocationAdd');
    console.log('new location', newLoc);
    console.log('state locations', this.state.locations);
    var newLocations = this.state.locations.concat([newLoc]);
    this.setState({
      locations: newLocations
    });


    // $.post('/api/weather/location/add', function(result) {
    //   console.log('result', result);
    // }.bind(this));
    $.ajax({
      type: 'POST',
      url: '/api/weather/location/add',
      contentType: 'application/json',
      // dataType: 'json',
      data: JSON.stringify(newLoc),
      success: function(data){
          console.log("device control succeeded", data);
      },
      error: function(){
          console.log("Device control failed");
      },
      // processData: false,
    }).bind(this);
  },



  getInitialState: function () {
      return {
        locations: []
      };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      console.log('getting user locations', result.weatherLocations[0]);
      if (this.isMounted()) {
        this.setState({
          locations: result ? result.weatherLocations : []
        });
      }
    }.bind(this));
  },

  render: function () {
    return (
      <div className="locationBox">
        <h3>Locations</h3>
        <LocationForm addLocClick={this.handleLocationAdd}/>
        <LocationList locations={this.state.locations}/>
      </div>
    )
  }
});

module.exports = LocationBox;
