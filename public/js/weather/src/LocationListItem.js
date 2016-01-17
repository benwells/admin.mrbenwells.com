var React = require('react');
// var classNames = require( 'classnames' );
var LocationListItem = React.createClass({

  doDelete: function (locationId, e) {
    var proceed = confirm("Are you sure you want to delete this location?");
    if (proceed) this.props.doDelete(locationId);
  },

  render: function () {
    var locationName = this.props.locationName;

    return (
      <div className={this.props.classes}>
      <span className="deleteBtn" onClick={this.doDelete.bind(null, this.props.locId)}>
        <span>
          <i className="fa fa-2x fa-trash"/> | 
        </span>
      </span>
        <span onClick={this.props.onSelectClick.bind(null, this.props.index)}>{this.props.locationName}</span>
      </div>
    )
  }
});

module.exports = LocationListItem;
