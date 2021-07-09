import React from 'react';
import PropTypes from 'prop-types';

export default function Text({ children }) {
  return <h2>{children}</h2>;
}

Text.propTypes = {
  children: PropTypes.string.isRequired,
};
