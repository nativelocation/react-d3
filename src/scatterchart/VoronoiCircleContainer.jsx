'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var d3 = require('d3');
var shade = require('../utils').shade;
var VoronoiCircle = require('./VoronoiCircle');

module.exports = createReactClass({

  displayName: 'VornoiCircleContainer',

  propTypes: {
    circleFill:             PropTypes.string,
    circleRadius:           PropTypes.number,
    circleRadiusMultiplier: PropTypes.number,
    className:              PropTypes.string,
    hoverAnimation:         PropTypes.bool,
    shadeMultiplier:        PropTypes.number,
    vnode:                  PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {
      circleFill:             '#1f77b4',
      circleRadius:           3,
      circleRadiusMultiplier: 1.25,
      className:              'rd3-scatterchart-voronoi-circle-container',
      hoverAnimation:         true,
      shadeMultiplier:        0.2
    };
  },

  getInitialState() {
    return {
      circleFill:   this.props.circleFill,
      circleRadius: this.props.circleRadius
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      circleFill:   nextProps.circleFill,
      circleRadius: nextProps.circleRadius
    });
  },

  render() {

    var props = this.props;
    var state = this.state;

    return (
      <g
        className={props.className}
      >
        <VoronoiCircle
          circleFill={state.circleFill}
          circleRadius={state.circleRadius}
          cx={props.cx}
          cy={props.cy}
          handleMouseLeave={this._restoreCircle}
          handleMouseOver={this._animateCircle}
          voronoiPath={this._drawPath(props.vnode)}
        />
      </g>
    );
  },

  _animateCircle() {
    var props = this.props;

    if(props.hoverAnimation) {
      this.setState({
        circleFill:   shade(props.circleFill, props.shadeMultiplier),
        circleRadius: props.circleRadius * props.circleRadiusMultiplier
      });
    }
  },

  _restoreCircle() {
    var props = this.props;

    if(props.hoverAnimation) {
      this.setState({
        circleFill:   props.circleFill,
        circleRadius: props.circleRadius
      });
    }
  },

  _drawPath: function(d) {
    if(typeof d === 'undefined') {
      return 'M Z';
    }

    return 'M' + d.join(',') + 'Z';
  },
});
