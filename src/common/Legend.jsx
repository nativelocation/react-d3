'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var d3 = require('d3');

module.exports = createReactClass({

  displayName: 'Legend',

  propTypes: {
    className:     PropTypes.string,
    colors:        PropTypes.func,
    colorAccessor: PropTypes.func,
    data:          PropTypes.array.isRequired,
    itemClassName: PropTypes.string,
    margins:       PropTypes.object,
    text:          PropTypes.string,
    width:         PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      className:    'rd3-legend',
      colors:        d3.scale.category20c(),
      colorAccessor: (d, idx) => idx,
      itemClassName: 'rd3-legend-item',
      text:          '#000'
    };
  },

  render: function() {

    var props = this.props;

    var textStyle = {
      'color': 'black',
      'fontSize': '50%',
      'verticalAlign': 'top'
    };

    var legendItems = [];

    props.data.forEach( (series, idx) => {
      var itemStyle = {
        'color': props.colors(props.colorAccessor(series, idx)),
        'lineHeight': '60%',
        'fontSize': '200%'
      };

      legendItems.push(
        <li
          key={idx}
          className={props.itemClassName}
          style={itemStyle}
        >
          <span
            style={textStyle}
          >
            {series.name}
          </span>
        </li>
      );

    });

    var topMargin = props.margins.top;

    var legendBlockStyle = {
      'wordWrap': 'break-word',
      'width': props.width,
      'paddingLeft': '0',
      'marginBottom': '0',
      'marginTop': topMargin,
      'listStylePosition': 'inside'
    };

    return (
      <ul
        className={props.className}
        style={legendBlockStyle}
      >
        {legendItems}
      </ul>
    );
  }

});
