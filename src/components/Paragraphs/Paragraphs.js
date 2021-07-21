import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../../contexts/FoodContext';

export default function Paragraphs({ children, dataTestid }) {
  const context = useContext(FoodContext);
  const { color: { colorH2 } } = context;
  const { color: { colorDiv } } = context;
  return (
    <p
      style={ { textAlign: 'justify', backgroundColor: colorDiv, color: colorH2 } }
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
