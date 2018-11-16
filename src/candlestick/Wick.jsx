'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');


module.exports = createReactClass({

  displayName: 'Wick',

  propTypes: {
    className:      PropTypes.string,
    shapeRendering: PropTypes.string,
    stroke:         PropTypes.string,
    strokeWidth:    PropTypes.number,
  },

  getDefaultProps() {
    return {
      className:      'rd3-candlestick-wick',
      stroke:         '#000',
      strokeWidth:    1,
      shapeRendering: 'crispEdges',
    };
  },

  render() {
    var props = this.props;
    return <line
            stroke={props.stroke}
            strokeWidth={props.strokeWidth}
            style={{ shapeRendering: props.shapeRendering }}
            className={props.className}
            x1={props.wick_x1}
            y1={props.wick_y1}
            x2={props.wick_x2}
            y2={props.wick_y2}
          />;
  }

});
