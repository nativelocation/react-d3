'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');


module.exports = createReactClass({

  displayName: 'Label',

  propTypes: {
    height:              PropTypes.number,
    horizontalTransform: PropTypes.string,
    label:               PropTypes.string.isRequired,
    width:               PropTypes.number,
    strokeWidth:         PropTypes.number,
    textAnchor:          PropTypes.string,
    verticalTransform:   PropTypes.string
  },

  getDefaultProps() {
    return {
      horizontalTransform: 'rotate(270)',
      strokeWidth:         0.01,
      textAnchor:          'middle',
      verticalTransform:   'rotate(0)'
    };
  },

  render() {

    var props = this.props;

    if (props.label) {
      switch (props.orient) {
        case 'top':
          return (
            <text
              strokeWidth={props.strokeWidth.toString()}
              textAnchor={props.textAnchor}
              transform={props.verticalTransform}
              x={props.width / 2}
              y={props.offset}
            >
              {props.label}
            </text>
          );
        case 'bottom':
          return (
            <text
              strokeWidth={props.strokeWidth.toString()}
              textAnchor={props.textAnchor}
              transform={props.verticalTransform}
              x={props.width / 2}
              y={props.offset}
            >
              {props.label}
            </text>
          );
        case 'left':
          return (
            <text
              strokeWidth={props.strokeWidth.toString()}
              textAnchor={props.textAnchor}
              transform={props.horizontalTransform}
              y={-props.offset}
              x={-props.height / 2}
            >
              {props.label}
            </text>
          );
        case 'right':
          return (
            <text
              strokeWidth={props.strokeWidth.toString()}
              textAnchor={props.textAnchor}
              transform={props.horizontalTransform}
              y={props.offset}
              x={-props.height / 2}
            >
              {props.label}
            </text>
          );
      }
    }
    return <text/>;
  }

});
