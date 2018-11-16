'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var d3 = require('d3');
var AreaContainer = require('./AreaContainer');

module.exports = createReactClass({

  displayName: 'DataSeries',

  propTypes: {
    fill:              PropTypes.string,
    interpolationType: PropTypes.string
  },

  getDefaultProps() {
    return {
      interpolationType: 'linear'
    };
  },

  render() {

    var props = this.props;

    var area = d3.svg.area()
      .x((d)=> { return props.xScale(props.xAccessor(d)); })
      .y0((d)=> { return props.yScale(d.y0); })
      .y1((d)=> { return props.yScale(d.y0 + props.yAccessor(d)); })
      .interpolate(props.interpolationType);

    var path = area(props.data);

    return (
      <AreaContainer 
        fill={props.fill} 
        hoverAnimation={props.hoverAnimation}
        path={path} 
      />
    );
  }

});
