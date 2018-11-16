
'use strict';

var React = require('react');
var PropTypes = require('prop-types');

module.exports =  {

  propTypes: {
    viewBox:           PropTypes.string,
    viewBoxObject:     PropTypes.object
  },

  getViewBox() {
    if (this.props.viewBoxObject) {
      var v = this.props.viewBoxObject;
      return [v.x, v.y, v.width, v.height].join(' ');
    } else if (this.props.viewBox) {
      return this.props.viewBox;
    } 
  },

  getOuterDimensions() {
    if (this.props.viewBoxObject) {
      return {
        width: this.props.viewBoxObject.width,
        height: this.props.viewBoxObject.height
      };
    } else {
      return {
        width: this.props.width,
        height: this.props.height
      };
    }
  }

};
