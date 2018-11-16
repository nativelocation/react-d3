'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var d3 = require('d3');

module.exports =  {

  propTypes: {
    axesColor:         PropTypes.string,
    colors:            PropTypes.func,
    colorAccessor:     PropTypes.func,
    data:              PropTypes.array.isRequired,
    height:            PropTypes.number,
    legend:            PropTypes.bool,
    legendOffset:      PropTypes.number,
    title:             PropTypes.string,
    width:             PropTypes.number,
    xAccessor:         PropTypes.func,
    xAxisFormatter:    PropTypes.func,
    xAxisLabel:        PropTypes.string,
    xAxisLabelOffset:  PropTypes.number,
    xAxisTickCount:    PropTypes.number,
    xAxisTickInterval: PropTypes.object,
    xAxisTickValues:   PropTypes.array,
    xOrient:           PropTypes.oneOf(['top', 'bottom']),
    yAccessor:         PropTypes.func,
    yAxisFormatter:    PropTypes.func,
    yAxisLabel:        PropTypes.string,
    yAxisLabelOffset:  PropTypes.number,
    yAxisTickCount:    PropTypes.number,
    yAxisTickInterval: PropTypes.object,
    yAxisTickValues:   PropTypes.array,
    yOrient:           PropTypes.oneOf(['left', 'right'])
  },

  getDefaultProps: function() {
    return {
      axesColor:        '#000',
      colors:           d3.scale.category20c(),
      colorAccessor:    (d, idx) => idx,
      height:           200,
      legend:           false,
      legendOffset:     120,
      title:            '',
      width:            400,
      xAccessor:        (d) => d.x,
      // xAxisFormatter: no predefined value right now
      xAxisLabel:       '',
      xAxisLabelOffset: 38,
      // xAxisTickCount: no predefined value right now
      // xAxisTickInterval: no predefined value right now
      // xAxisTickValues: no predefined value right now
      xOrient:          'bottom',
      yAccessor:        (d) => d.y,
      // yAxisFormatter: no predefined value right now
      yAxisLabel:       '',
      yAxisLabelOffset: 35,
      // yAxisTickCount: no predefined value right now
      // yAxisTickInterval: no predefined value right now
      // yAxisTickValues: no predefined value right now
      yOrient:          'left'
    };
  }
};
