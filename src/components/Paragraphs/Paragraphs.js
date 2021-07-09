import React from 'react';
import PropTypes from 'prop-types';

export default function Paragraphs({ children, dataTestid }) {
  return (
    <p
      dataTestid={ `${dataTestid}` }
    >
      { children }
    </p>
  );
}

Paragraphs.propTypes = {
  children: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};
