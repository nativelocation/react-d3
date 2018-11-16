'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var d3 = require('d3');
var AxisTicks = require('./AxisTicks');
var AxisLine = require('./AxisLine');
var Label = require('./Label');

module.exports = createReactClass({

  displayName: 'XAxis',

  propTypes: {
    fill:            PropTypes.string,
    height:          PropTypes.number.isRequired,
    width:           PropTypes.number.isRequired,
    stroke:          PropTypes.string,
    strokeWidth:     PropTypes.string,
    tickStroke:      PropTypes.string,
    xAxisClassName:  PropTypes.string,
    xAxisLabel:      PropTypes.string,
    xAxisTickValues: PropTypes.array,
    xAxisOffset:     PropTypes.number,
    xScale:          PropTypes.func.isRequired,
    xOrient:         PropTypes.oneOf(['top', 'bottom']),
    yOrient:         PropTypes.oneOf(['left', 'right']),
    gridVertical:  PropTypes.bool,
    gridVerticalStroke: PropTypes.string,
    gridVerticalStrokeWidth: PropTypes.number,
    gridVerticalStrokeDash: PropTypes.string
  },

  getDefaultProps() {
    return {
      fill:            'none',
      stroke:          'none',
      strokeWidth:     '1',
      tickStroke:      '#000',
      xAxisClassName:  'rd3-x-axis',
      xAxisLabel:      '',
      xAxisLabelOffset: 10,
      xAxisOffset:      0,
      xOrient:         'bottom',
      yOrient:         'left'
    };
  },

  render() {
    var props = this.props;

    var t = `translate(0 ,${props.xAxisOffset + props.height})`;

    var tickArguments;
    if (typeof props.xAxisTickCount !== 'undefined') {
      tickArguments = [props.xAxisTickCount];
    }

    if (typeof props.xAxisTickInterval !== 'undefined') {
      tickArguments = [d3.time[props.xAxisTickInterval.unit], props.xAxisTickInterval.interval];
    }

    return (
      <g
        className={props.xAxisClassName}
        transform={t}
      >
        <AxisTicks
          tickValues={props.xAxisTickValues}
          tickFormatting={props.tickFormatting}
          tickArguments={tickArguments}
          tickStroke={props.tickStroke}
          tickTextStroke={props.tickTextStroke}
          innerTickSize={props.tickSize}
          scale={props.xScale}
          orient={props.xOrient}
          orient2nd={props.yOrient}
          height={props.height}
          width={props.width}
          gridVertical={props.gridVertical}
          gridVerticalStroke={props.gridVerticalStroke}
          gridVerticalStrokeWidth={props.gridVerticalStrokeWidth}
          gridVerticalStrokeDash={props.gridVerticalStrokeDash}
        />
        <AxisLine
          scale={props.xScale}
          stroke={props.stroke}
          orient={props.xOrient}
          outerTickSize={props.tickSize}
          {...props}
        />
        <Label
          label={props.xAxisLabel}
          offset={props.xAxisLabelOffset}
          orient={props.xOrient}
          margins={props.margins}
          width={props.width}
          />
      </g>
    );
  }

});
