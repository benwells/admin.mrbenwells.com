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
            <li className="active"><a href="#panel-806764" data-toggle="tab">Forecast</a></li>
          </ul>
          <div className="tab-content">
            <div id="panel-806764" className="tab-pane active">
              <p dangerouslySetInnerHTML={{__html:this.props.weatherData.description}}></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = LocationDashboard;
