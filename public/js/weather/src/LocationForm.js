var React = require('react'),
    Autosuggest = require('react-autosuggest');
var LocationForm = React.createClass({

  // addLocation: function (e) {
  //   var newLoc = this.refs.newLocation.value;
  //   this.props.addLocClick(newLoc);
  // },

  // handleKeypress: function (e) {
  //   var newLoc = this.refs.newLocation.value;
  //   console.log(newLoc);
  // },
  getSuggestions: function (input, callback) {
    $.get('/api/weather/locationsearch/' + input, function(suggestions) {
      setTimeout(callback(null, suggestions.predictions), 300); // Emulate API call
    }.bind(this));
  },
  renderSuggestion: function (suggestion, input) { // In this example, 'suggestion' is a string
    return (                                     // and it returns a ReactElement
      <span><strong>{suggestion.description}</strong></span>
    );
  },
  onSuggestionSelected: function(suggestion, event) {
    console.log('suggestion', suggestion);
    this.props.addLocClick(suggestion);
  },
  getSuggestionValue: function (suggestionObj) {
    return suggestionObj.description;
  },
  render: function () {
    return (
      <div>
        <Autosuggest
          className="form-control"
          suggestions={this.getSuggestions}
          suggestionRenderer={this.renderSuggestion}
          onSuggestionSelected={this.onSuggestionSelected}
          suggestionValue={this.getSuggestionValue}
          showWhen={input => input.trim().length >= 3}
        />
        <input id="autocomplete" ref="newLocation" type="text" className="form-control" onKeyUpCapture={this.handleKeypress}/>
        <button className="btn btn-success" onClick={this.addLocation}>
  				Add
  			</button>
      </div>
    )
  }
});

module.exports = LocationForm;
