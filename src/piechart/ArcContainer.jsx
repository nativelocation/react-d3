'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var shade = require('../utils').shade;
var Arc = require('./Arc');

module.exports = createReactClass({

  displayName: 'ArcContainer',

  propTypes: {
    fill: PropTypes.string
  },

  getInitialState() {
    return {
      // fill is named as fill instead of initialFill to avoid
      // confusion when passing down props from top parent
      fill: this.props.fill
    };
  },

  render() {

    var props = this.props;
    
    return (
      <Arc 
        {...this.props}
        fill={this.state.fill}
        handleMouseOver={props.hoverAnimation ? this._animateArc : null}
        handleMouseLeave={props.hoverAnimation ? this._restoreArc : null}
      />
    );
  },

  _animateArc() {
    this.setState({
      fill: shade(this.props.fill, 0.2)
    });
  },

  _restoreArc() {
    this.setState({
      fill: this.props.fill
    });
  }
});
