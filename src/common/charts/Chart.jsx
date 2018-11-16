'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var LegendChart = require('./LegendChart');
var BasicChart = require('./BasicChart');

module.exports = createReactClass({

  displayName: 'Chart',

  propTypes: {
    legend:         PropTypes.bool,
    svgClassName:   PropTypes.string,
    titleClassName: PropTypes.string
  },

  getDefaultProps: function() {
    return {
      legend:         false,
      svgClassName:   'rd3-chart',
      titleClassName: 'rd3-chart-title'
    };
  },

  render: function() {
    var props = this.props;

    if (props.legend) {
      return (
        <LegendChart
          svgClassName={props.svgClassName}
          titleClassName={props.titleClassName}
          {...this.props}
        />
      );
    }
    return (
      <BasicChart 
        svgClassName={props.svgClassName}
        titleClassName={props.titleClassName}
        {...this.props}
      />
    );
  }

});
