'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var d3 = require('d3');


module.exports = createReactClass({

  displayName: 'Arc',

  propTypes: {
    fill: PropTypes.string,
    d: PropTypes.string,
    startAngle: PropTypes.number,
    endAngle: PropTypes.number,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    labelTextFill: PropTypes.string,
    valueTextFill: PropTypes.string,
    sectorBorderColor: PropTypes.string,
    showInnerLabels: PropTypes.bool,
    showOuterLabels: PropTypes.bool
  },

  getDefaultProps() {
    return {
      labelTextFill: 'black',
      valueTextFill: 'white',
      showInnerLabels: true,
      showOuterLabels: true
    };
  },

  render() {
    var props = this.props;

    var arc = d3.svg.arc()
      .innerRadius(props.innerRadius)
      .outerRadius(props.outerRadius)
      .startAngle(props.startAngle)
      .endAngle(props.endAngle);

    return (
      <g className='rd3-piechart-arc' >
        <path
          d={arc()}
          fill={props.fill}
          stroke={props.sectorBorderColor}
          onMouseOver={props.handleMouseOver}
          onMouseLeave={props.handleMouseLeave}
        />
        {props.showOuterLabels ? this.renderOuterLabel(props, arc) : null}
        {props.showInnerLabels ? this.renderInnerLabel(props, arc) : null}
      </g>
    );
  },

  renderInnerLabel(props, arc) {
    // make value text can be formatted
    var formattedValue = props.valueTextFormatter(props.value);
    return (
        <text
          className='rd3-piechart-value'
          transform={`translate(${arc.centroid()})`}
          dy='.35em'
          style={{
            'shapeRendering': 'crispEdges',
            'textAnchor': 'middle',
            'fill': props.valueTextFill
          }}>
          { formattedValue }
        </text>
      );
  },

  renderOuterLabel(props, arc) {

    var rotate = `rotate(${ (props.startAngle+props.endAngle)/2 * (180/Math.PI) })`;
    var positions = arc.centroid();
    var radius = props.outerRadius;
    var dist   = radius + 35;
    var angle  = (props.startAngle + props.endAngle) / 2;
    var x      = dist * (1.2 * Math.sin(angle));
    var y      = -dist * Math.cos(angle);
    var t = `translate(${x},${y})`;

    return  (
      <g>
        <line
          x1='0'
          x2='0'
          y1={-radius - 2}
          y2={-radius - 26}
          stroke={props.labelTextFill}
          transform={rotate}
          style={{
            'fill': props.labelTextFill,
            'strokeWidth': 2
          }}
          >
        </line>
        <text
          className='rd3-piechart-label'
          transform={t}
          dy='.35em'
          style={{
            'textAnchor': 'middle',
            'fill': props.labelTextFill,
            'shapeRendering': 'crispEdges'
          }}>
          {props.label}
        </text>
      </g>
    );
  }
});
