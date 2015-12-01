var React = require('react');
var LocationListItem = React.createClass({
  render: function () {
    return (
      <div className="panel-body">
        {this.props.locationName}
      </div>
    )
  }
});

module.exports = LocationListItem;
