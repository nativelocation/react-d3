'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var shade = require('../utils').shade;
var Cell = require('./Cell');


module.exports = createReactClass({

  displayName: 'CellContainer',

  propTypes: {
    fill: PropTypes.string,
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
      <Cell 
        {...props}
        fill={this.state.fill}
        handleMouseOver={props.hoverAnimation ? this._animateCell : null}
        handleMouseLeave={props.hoverAnimation ? this._restoreCell : null}
      />
    );
  },

  _animateCell() {
    this.setState({
      fill: shade(this.props.fill, 0.05)
    });
  },

  _restoreCell() {
    this.setState({
      fill: this.props.fill
    });
  }
});
