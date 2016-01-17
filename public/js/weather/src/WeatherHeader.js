var React = require('react');

var WeatherHeader = React.createClass({
  render: function () {
    return (
      <div>
        <h3>{this.props.locationTitle}</h3>
        <p className="text-muted">
          <em>{this.props.currently}</em>
        </p>
      </div>
    )
  }
});

module.exports = WeatherHeader;
