import React from 'react';
import PropTypes from 'prop-types';

const ColoredLine = ({ color }) => (
  <hr
    style={ {
      color,
      backgroundColor: color,
      height: 5,
    } }
  />
);

ColoredLine.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColoredLine;
