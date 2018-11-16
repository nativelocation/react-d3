'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var d3 = require('d3');
var AxisTicks = require('./AxisTicks');
var AxisLine = require('./AxisLine');
var Label = require('./Label');

module.exports = createReactClass({

  displayName: 'YAxis',

  propTypes: {
    fill:            PropTypes.string,
    stroke:          PropTypes.string,
    strokeWidth:     PropTypes.string,
    tickStroke:      PropTypes.string,
    width:           PropTypes.number.isRequired,
    height:          PropTypes.number.isRequired,
    yAxisClassName:  PropTypes.string,
    yAxisLabel:      PropTypes.string,
    yAxisOffset:     PropTypes.number,
    yAxisTickValues: PropTypes.array,
    xOrient:         PropTypes.oneOf(['top', 'bottom']),
    yOrient:         PropTypes.oneOf(['left', 'right']),
    yScale:          PropTypes.func.isRequired,
    gridVertical: PropTypes.bool,
    gridVerticalStroke: PropTypes.string,
    gridVerticalStrokeWidth: PropTypes.number,
    gridVerticalStrokeDash: PropTypes.string
  },

  getDefaultProps() {
    return {
      fill:           'none',
      stroke:         '#000',
      strokeWidth:    '1',
      tickStroke:     '#000',
      yAxisClassName: 'rd3-y-axis',
      yAxisLabel:     '',
      yAxisOffset:    0,
      xOrient:        'bottom',
      yOrient:        'left'
    };
  },

  render() {

    var props = this.props;

    var t;
    if (props.yOrient === 'right') {
       t = `translate(${props.yAxisOffset + props.width}, 0)`;
    } else {
       t = `translate(${props.yAxisOffset}, 0)`;
    }

    var tickArguments;
    if (props.yAxisTickCount) {
      tickArguments = [props.yAxisTickCount];
    }

    if (props.yAxisTickInterval) {
      tickArguments = [d3.time[props.yAxisTickInterval.unit], props.yAxisTickInterval.interval];
    }

    return (
      <g
        className={props.yAxisClassName}
        transform={t}
      >
        <AxisTicks
          innerTickSize={props.tickSize}
          orient={props.yOrient}
          orient2nd={props.xOrient}
          tickArguments={tickArguments}
          tickFormatting={props.tickFormatting}
          tickStroke={props.tickStroke}
          tickTextStroke={props.tickTextStroke}
          tickValues={props.yAxisTickValues}
          scale={props.yScale}
          height={props.height}
          width={props.width}
          gridHorizontal={props.gridHorizontal}
          gridHorizontalStroke={props.gridHorizontalStroke}
          gridHorizontalStrokeWidth={props.gridHorizontalStrokeWidth}
          gridHorizontalStrokeDash={props.gridHorizontalStrokeDash}
        />
        <AxisLine
          orient={props.yOrient}
          outerTickSize={props.tickSize}
          scale={props.yScale}
          stroke={props.stroke}
          {...props}
        />
        <Label
          height={props.height}
          label={props.yAxisLabel}
          margins={props.margins}
          offset={props.yAxisLabelOffset}
          orient={props.yOrient}
        />
      </g>
    );
  }

});
