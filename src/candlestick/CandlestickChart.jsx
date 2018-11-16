'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var d3 = require('d3');
var utils = require('../utils');
var DataSeries = require('./DataSeries');
var { Chart, XAxis, YAxis } = require('../common');

module.exports = createReactClass({

  displayName: 'CandleStickChart',

  propTypes: {
    data:              PropTypes.oneOfType([
                         PropTypes.array,
                         PropTypes.object
                       ]),
    fillUp:            PropTypes.func,
    fillUpAccessor:    PropTypes.func,
    fillDown:          PropTypes.func,
    fillDownAccessor:  PropTypes.func,
    height:            PropTypes.number,
    hoverAnimation:    PropTypes.bool,
    title:             PropTypes.string,
    xAccessor:         PropTypes.func,
    xAxisFormatter:    PropTypes.func,
    xAxisTickInterval: PropTypes.object,
    xAxisTickValues:   PropTypes.array,
    yAccessor:         PropTypes.func,
    yAxisFormatter:    PropTypes.func,
    yAxisTickCount:    PropTypes.number,
    yAxisTickValues:   PropTypes.array,
    width:             PropTypes.number,
  },

  getDefaultProps() {
    return {
      className:        'rd3-candlestick',
      xAxisClassName:   'rd3-candlestick-xaxis',
      yAxisClassName:   'rd3-candlestick-yaxis',
      data:             [],
      fillUp:           (value) => '#ffffff',
      fillUpAccessor:   (d, idx) => idx,
      fillDown:         d3.scale.category20c(),
      fillDownAccessor: (d, idx) => idx,
      height:           200,
      hoverAnimation:   true,
      margins:          {top: 10, right: 20, bottom: 30, left: 45},
      legendOffset:     120,
      title:            '',
      xAccessor:        (d) => d.x,
      yAccessor:        (d) => ({ open: d.open, high: d.high, low: d.low, close: d.close }),
      width:            400,
    };
  },

  render() {

    var props = this.props;

    // Calculate inner chart dimensions
    var innerWidth, innerHeight;
    innerWidth = props.width - props.margins.left - props.margins.right;
    innerHeight = props.height - props.margins.top - props.margins.bottom;

    if (!Array.isArray(props.data)) {
      props.data = [props.data];
    }
    var flattenedData = utils.flattenData(props.data, props.xAccessor, props.yAccessor);

    var allValues = flattenedData.allValues,
        xValues = flattenedData.xValues,
        yValues = flattenedData.yValues;
    var scales = utils.calculateScales(innerWidth, innerHeight, xValues, yValues);

    var trans = `translate(${ props.yAxisOffset < 0 ? props.margins.left + Math.abs(props.yAxisOffset) : props.margins.left},${ props.margins.top })`;

    var dataSeries = props.data.map( (series, idx) => {
      return (
          <DataSeries
            key={idx}
            seriesName={series.name}
            index={idx}
            xScale={scales.xScale}
            yScale={scales.yScale}
            data={series.values}
            fillUp={props.fillUp(props.fillUpAccessor(series, idx))}
            fillDown={props.fillDown(props.fillDownAccessor(series, idx))}
            xAccessor={props.xAccessor}
            yAccessor={props.yAccessor}
            hoverAnimation={props.hoverAnimation}
          />
        );
      });

    return (
      <Chart
        viewBox={props.viewBox}
        width={props.width}
        height={props.height}
        margins={props.margins}
        title={props.title}
      >
        <g transform={trans} className={props.className}>
          <XAxis
            xAxisClassName={props.xAxisClassName}
            xScale={scales.xScale}
            xAxisTickValues={props.xAxisTickValues}
            xAxisTickInterval={props.xAxisTickInterval}
            xAxisOffset={props.xAxisOffset}
            tickFormatting={props.xAxisFormatter}
            xAxisLabel={props.xAxisLabel}
            xAxisLabelOffset={props.xAxisLabelOffset}
            xOrient={props.xOrient}
            yOrient={props.yOrient}
            margins={props.margins}
            width={innerWidth}
            height={innerHeight}
            gridVertical={props.gridVertical}
            gridVerticalStroke={props.gridVerticalStroke}
            gridVerticalStrokeWidth={props.gridVerticalStrokeWidth}
            gridVerticalStrokeDash={props.gridVerticalStrokeDash}
          />
          <YAxis
            yAxisClassName={props.yAxisClassName}
            yScale={scales.yScale}
            yAxisTickValues={props.yAxisTickValues}
            yAxisOffset={props.yAxisOffset}
            yAxisTickCount={props.yAxisTickCount}
            tickFormatting={props.yAxisFormatter}
            yAxisLabel={props.yAxisLabel}
            yAxisLabelOffset={props.yAxisLabelOffset}
            xOrient={props.xOrient}
            yOrient={props.yOrient}
            margins={props.margins}
            width={innerWidth}
            height={props.height}
            gridHorizontal={props.gridHorizontal}
            gridHorizontalStroke={props.gridHorizontalStroke}
            gridHorizontalStrokeWidth={props.gridHorizontalStrokeWidth}
            gridHorizontalStrokeDash={props.gridHorizontalStrokeDash}
          />
          {dataSeries}
        </g>
      </Chart>
    );
  }

});
