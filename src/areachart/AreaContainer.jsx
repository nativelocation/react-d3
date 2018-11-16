'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var d3 = require('d3');
var shade = require('../utils').shade;
var Area = require('./Area');

module.exports = createReactClass({

  displayName: 'AreaContainer',

  propTypes: {
    fill: PropTypes.string, 
  },

  getDefaultProps() {
    return {
      fill: '#3182bd'
    };
  },

  getInitialState() {
    return { 
      fill: this.props.fill
    };
  },

  render() {

    var props = this.props;

    // animation controller
    var handleMouseOver, handleMouseLeave;
    if(props.hoverAnimation) {
      handleMouseOver = this._animateArea;
      handleMouseLeave = this._restoreArea;
    } else {
      handleMouseOver = handleMouseLeave = null;
    }

    return (
      <Area
          handleMouseOver={handleMouseOver}
          handleMouseLeave={handleMouseLeave}
          {...props}
          fill={this.state.fill}
      />
    );
  },

  _animateArea() {
    this.setState({ 
      fill: shade(this.props.fill, 0.02)
    });
  },

  _restoreArea() {
    this.setState({ 
      fill: this.props.fill
    });
  },

});
