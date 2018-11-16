'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var mixins = require('../../mixins');

module.exports = createReactClass({

  displayName: 'BasicChart',

  propTypes: {
    children:       PropTypes.node,
    className:      PropTypes.string,
    height:         PropTypes.node,
    svgClassName:   PropTypes.string,
    title:          PropTypes.node,
    titleClassName: PropTypes.string,
    width:          PropTypes.node
  },

  getDefaultProps() {
    return {
      className:      'rd3-basic-chart',
      svgClassName:   'rd3-chart',
      titleClassName: 'rd3-chart-title'
    };
  },

  _renderTitle() {
    var props = this.props;

    if (props.title != '' && props.title != null) {
      return (
        <h4
          className={props.titleClassName}
        >
          {props.title}
        </h4>
      );
    } else {
      return null;
    }
  },

  _renderChart: function() {
    var props = this.props;

    return (
      <svg
        className={props.svgClassName}
        height={props.height}
        viewBox={props.viewBox}
        width={props.width}
      >
        {props.children}
      </svg>
    );
  },

  render: function() {
    var props = this.props;

    return (
      <div
        className={props.className}
      >
        {this._renderTitle()}
        {this._renderChart()}
      </div>
    );
  }
});
