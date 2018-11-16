'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

module.exports = createReactClass({

  displayName: 'Area',

  propTypes: {
    path: PropTypes.string,
    fill: PropTypes.string
  },

  getDefaultProps() {
    return {
      fill: '#3182bd'
    };
  },

  render() {

    return (
      <path
        className="rd3-areachart-area"
        d={this.props.path}
        fill={this.props.fill}
        onMouseOver={this.props.handleMouseOver}
        onMouseLeave={this.props.handleMouseLeave}
      />
    );
  }

});
