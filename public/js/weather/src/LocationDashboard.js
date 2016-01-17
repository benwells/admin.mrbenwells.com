var React = require('react');
var WeatherHeader = require('./WeatherHeader')
var LocationDashboard = React.createClass({
  render: function () {
    return (
      <div className="col-md-8">
        <WeatherHeader
          locationTitle={this.props.weatherData.title}
          currently={this.props.weatherData.currently}
        />
        <div id="tabs" className="tabbable">
          <ul className="nav nav-tabs">
            <li className="active"><a href="#panel-806764" data-toggle="tab">Now</a></li>
            <li><a href="#panel-164917" data-toggle="tab">Forecast</a></li>
            <li><a href="#panel-164917" data-toggle="tab">Radar Map</a></li>
          </ul>
          <div className="tab-content">
            <div id="panel-806764" className="tab-pane active">
              <p>I'm in Section 1.</p>
            </div>
            <div id="panel-164917" className="tab-pane">
              <p>Howdy, I'm in Section 2.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = LocationDashboard;
