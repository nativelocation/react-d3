'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var d3 = require('d3');
var utils = require('../utils');
var Candle = require('./Candle');
var Wick = require('./Wick');

module.exports = createReactClass({

  displayName: 'CandleStickContainer',

  propTypes: {
    candle_x:       PropTypes.number,
    candle_y:       PropTypes.number,
    className:      PropTypes.string,
    candleFill:     PropTypes.string,
    candleHeight:   PropTypes.number,
    candleWidth:    PropTypes.number,
    wick_x1:        PropTypes.number,
    wick_x2:        PropTypes.number,
    wick_y1:        PropTypes.number,
    wick_y2:        PropTypes.number,
  },

  getDefaultProps() {
    return {
      className: 'rd3-candlestick-container'
    };
  },

  getInitialState() {
    // state for animation usage
    return {
      candleWidth: this.props.candleWidth,
      candleFill: this.props.candleFill
    };
  },

  render() {

    var props = this.props;
    var state = this.state;

    // animation controller
    var handleMouseOver, handleMouseLeave;
    if(props.hoverAnimation) {
      handleMouseOver = this._animateCandle;
      handleMouseLeave = this._restoreCandle;
    } else {
      handleMouseOver = handleMouseLeave = null;
    }

    return (
      <g className={props.className}>
       <Wick
         wick_x1={props.wick_x1}
         wick_x2={props.wick_x2}
         wick_y1={props.wick_y1}
         wick_y2={props.wick_y2}
       />
       <Candle
         candleFill={state.candleFill}
         candleWidth={state.candleWidth}
         candle_x={props.candle_x - ((state.candleWidth - props.candleWidth) / 2)}
         candle_y={props.candle_y}
         candleHeight={props.candleHeight}
         handleMouseOver={handleMouseOver}
         handleMouseLeave={handleMouseLeave}
       />
      </g>
    );
  },

  _animateCandle() {
    this.setState({ 
      candleWidth: this.props.candleWidth * 1.5,
      candleFill: utils.shade(this.props.candleFill, -0.2)
    });
  },

  _restoreCandle() {
    this.setState({ 
      candleWidth: this.props.candleWidth,
      candleFill: this.props.candleFill
    });
  },

});
