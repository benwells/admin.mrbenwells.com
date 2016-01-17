var React = require('react');
var LocationForm = require('./LocationForm');
var LocationList = require('./LocationList');

var LocationBox = React.createClass({

  handleLocationAdd: function (newLoc) {
    console.log("location add", newLoc);
    var newLocations = this.props.locations.concat([newLoc]);
    this.props.stateHandler({ locations: newLocations, searchBoxValue: "" }, '/api/weather/location/add', 'POST', newLoc);
  },

  handleLocationDelete: function (locationId) {
    var newLocations = this.props.locations.filter(function(loc){
      return loc.locId !== locationId;
    });
    this.props.stateHandler({ locations: newLocations }, '/api/weather/location/delete', 'POST', { id: locationId });
  },

  handleLocationSelect: function(index) {
    //set all locations as unselected
    var newLocations = this.props.locations.map(function (location) {
      location.selected = false;
      return location;
    });

    //"select" the single location
    newLocations[index].selected = 'true';
    this.props.stateHandler({ locations: newLocations, selectedLocation: newLocations[index] });
  },

  render: function () {
    return (
      <div className="locationBox col-md-4">
        <h3>Locations</h3>
        <LocationForm
          addLocClick={this.handleLocationAdd}
          searchBoxValue={this.props.searchBoxValue}
        />
        <LocationList
          className="location-list"
          locations={this.props.locations}
          deleteHandler={this.handleLocationDelete}
          makeSelected={this.handleLocationSelect}
        />
      </div>
    )
  }
});

module.exports = LocationBox;
