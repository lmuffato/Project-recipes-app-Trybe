import React from 'react';
import PropTypes from 'prop-types';

export default function Paragraphs({ children, dataTestid }) {
  return (
    <p
      style={ { textAlign: 'justify' } }
      className="details-cards"
      data-testid={ `${dataTestid}` }
    >
      { children }
    </p>
  );
}

Paragraphs.propTypes = {
  children: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};
