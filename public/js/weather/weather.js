var LocationListItem = React.createClass({
  render: function () {
    return (
      <div className="panel-body">
        {this.props.locationName}
      </div>
    )
  }
});

var LocationList = React.createClass({

  render: function () {
    console.log(this.props);
    var locs = this.props.locations.map(function(location) {
      return (
        <LocationListItem locationName={location} />
      );
    });
    return (
      <div className="panel panel-default">
        {locs}
      </div>
    )
  }
});

var LocationForm = React.createClass({

  addLocation: function (e) {
    var newLoc = this.refs.newLocation.getDOMNode().value;
    this.props.onClick(newLoc);
  },

  // https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Charleston&key=AIzaSyCLGpmJscgJnJ8aWSlT-6Pu7F_qo-9nivQ
  handleKeypress: function (e) {
    var newLoc = this.refs.newLocation.getDOMNode().value;
    console.log(newLoc);
  },
  render: function () {
    return (
      <div>
        <input id="autocomplete" ref="newLocation" type="text" className="form-control" onKeyUpCapture={this.handleKeypress}/>
        <button className="btn btn-success" onClick={this.addLocation}>
  				Add
  			</button>
      </div>
    )
  }
});

var LocationBox = React.createClass({

  handleLocationAdd: function (newLoc) {
    console.log('handleLocationAdd');
    var newLocations = this.state.locations.concat([newLoc]);
    this.setState({
      locations: newLocations
    });
  },

  getInitialState: function () {
      return {
        locations: []
      }
  },

  render: function () {
    return (
      <div className="locationBox">
        <h3>Locations</h3>
        <LocationForm onClick={this.handleLocationAdd}/>
        <LocationList locations={this.state.locations}/>
      </div>
    )
  }
});

ReactDOM.render(
  <LocationBox />,
  document.getElementById('locationCol')
)
