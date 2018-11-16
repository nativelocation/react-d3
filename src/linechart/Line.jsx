'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');


module.exports = createReactClass({

  displayName: 'Line',

  propTypes: {
    fill: PropTypes.string,
    path: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
    strokeDashArray: PropTypes.string,
  },

  getDefaultProps() {
    return {
      stroke: '#3182bd',
      fill: 'none',
      strokeWidth: 1,
      className: 'rd3-linechart-path'
    };
  },

  render() {
    var props = this.props;
    return (
      <path
        d={props.path}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
        strokeDasharray={props.strokeDashArray}
        fill={props.fill}
        className={props.className}
      />
    );
  }

});
