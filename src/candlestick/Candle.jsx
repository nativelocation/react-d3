'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

module.exports = createReactClass({

  displayName: 'Candle',

  propTypes: {
    className:      PropTypes.string,
    shapeRendering: PropTypes.string,
    stroke:         PropTypes.string,
    strokeWidth:    PropTypes.number,
  },

  getDefaultProps() {
    return {
      className:      'rd3-candlestick-candle',
      shapeRendering: 'crispEdges',
      stroke:         '#000',
      strokeWidth:    1,
    };
  },

  render() {
    var props = this.props;

    return (
      <rect
        className={props.className}
        fill={props.candleFill}
        x={props.candle_x}
        y={props.candle_y}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
        style={{ shapeRendering: props.shapeRendering }}
        width={props.candleWidth}
        height={props.candleHeight}
        onMouseOver={props.handleMouseOver}
        onMouseLeave={props.handleMouseLeave}
      />
    );
  }

});
