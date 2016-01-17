var React = require('react');
var LocationListItem = require('./LocationListItem');
var LocationList = React.createClass({

  generateClass: function(selected) {
    var classes = {
      "panel-body": true,
      "selected": selected ? true : false
    };
    var classArr = [];

    for(var propt in classes){
      if (classes[propt]) classArr.push(propt);
    }
    return classArr.join(" ");
  },

  render: function () {
    var locs = [];
    if (this.props.locations.length) {
      locs = this.props.locations.map(function(location, index) {

        location.classes = this.generateClass(location.selected);

        return (
          <LocationListItem
            locationName={location.description}
            locId={location.locId}
            key={location.locId}
            index={index}
            doDelete={this.props.deleteHandler}
            classes={location.classes}
            onSelectClick={this.props.makeSelected}
            />
        );
      }, this);
    }
    return (
      <div className="panel panel-default">
        {locs}
      </div>
    )
  }
});

module.exports = LocationList;
