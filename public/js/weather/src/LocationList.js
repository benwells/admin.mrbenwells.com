var React = require('react');
var LocationListItem = require('./LocationListItem');
var LocationList = React.createClass({

  render: function () {
    console.log('locs', locs);
    console.log('props locs', this.props.locations);
    var locs = [];
    if (this.props.locations.length) {
      locs = this.props.locations.map(function(location) {
        return (
          <LocationListItem locationName={location.description} key={location.id}/>
        );
      });
    }
    return (
      <div className="panel panel-default">
        {locs}
      </div>
    )
  }
});

module.exports = LocationList;
