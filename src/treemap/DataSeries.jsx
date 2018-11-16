'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var d3 = require('d3');
var CellContainer = require('./CellContainer');


module.exports = createReactClass({

  displayName: 'DataSeries',

  propTypes: {
    data:          PropTypes.array,
    colors:        PropTypes.func,
    colorAccessor: PropTypes.func,
    width:         PropTypes.number,
    height:        PropTypes.number
  },

  getDefaultProps() {
    return {
      data:          [],
      colors:        d3.scale.category20c(),
      colorAccessor: (d, idx) => idx
    };
  },

  render() {

    var props = this.props;

    var treemap = d3.layout.treemap()
                    // make sure calculation loop through all objects inside array
                    .children( (d) => d)
                    .size([props.width, props.height])
                    .sticky(true)
                    .value( (d) => { return d.value; });

    var tree = treemap(props.data);

    var cells = tree.map( (node, idx) => {
      return (
        <CellContainer
          key={idx}
          x={node.x}
          y={node.y}
          width={node.dx}
          height={node.dy}
          fill={props.colors(props.colorAccessor(node, idx))}
          label={node.label}
          fontSize={props.fontSize}
          textColor={props.textColor}
          hoverAnimation={props.hoverAnimation}
        />
      );
    }, this);

    return (
      <g transform={props.transform} className='treemap'>
        {cells}
      </g>
    );
  }

});
