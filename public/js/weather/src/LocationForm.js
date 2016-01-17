var React = require('react'),
    Autosuggest = require('react-autosuggest');
var LocationForm = React.createClass({

  getSuggestions: function (input, callback) {
    $.get('/api/weather/locationsearch/' + input, function(suggestions) {
      setTimeout(callback(null, suggestions.predictions), 300); // Emulate API call
    }.bind(this));
  },
  renderSuggestion: function (suggestion, input) { // In this example, 'suggestion' is a string
    return (                                     // and it returns a ReactElement
      <span>{suggestion.description}</span>
    );
  },
  onSuggestionSelected: function(suggestion, event) {
    setTimeout(function(){
      $('.react-autosuggest input').val('');
    },100)
    this.props.addLocClick(suggestion);
  },
  getSuggestionValue: function (suggestionObj) {
    return suggestionObj.description;
  },
  render: function () {
    return (
      <div className="form-group">
        <Autosuggest
          className="form-control"
          id="search-box"
          type="text"
          focusInputOnSuggestionClick={false}
          value={this.props.searchBoxValue}
          suggestions={this.getSuggestions}
          suggestionRenderer={this.renderSuggestion}
          onSuggestionSelected={this.onSuggestionSelected}
          suggestionValue={this.getSuggestionValue}
          showWhen={input => input.trim().length >= 3}
        />
      </div>
    )
  }
});

module.exports = LocationForm;
