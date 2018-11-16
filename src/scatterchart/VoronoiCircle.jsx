'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var d3 = require('d3');

module.exports = createReactClass({

  displayName: 'VoronoiCircle',

  propTypes: {
    circleFill:       PropTypes.string.isRequired,
    circleRadius:     PropTypes.number.isRequired,
    className:        PropTypes.string,
    cx:               PropTypes.number.isRequired,
    cy:               PropTypes.number.isRequired,
    handleMouseLeave: PropTypes.func.isRequired,
    handleMouseOver:  PropTypes.func.isRequired,
    pathFill:         PropTypes.string,
    voronoiPath:      PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      className:    'rd3-scatterchart-voronoi-circle',
      pathFill:     'transparent'
    };
  },

  render() {
    var props = this.props;

    return (
      <g>
        <path
          d={props.voronoiPath}
          fill={props.pathFill}
          onMouseLeave={props.handleMouseLeave}
          onMouseOver={props.handleMouseOver}
        />
        <circle
          cx={props.cx}
          cy={props.cy}
          className={props.className}
          fill={props.circleFill}
          onMouseLeave={props.handleMouseLeave}
          onMouseOver={props.handleMouseOver}
          r={props.circleRadius}
        />
      </g>
    );
  },
});
