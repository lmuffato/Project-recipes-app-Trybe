import React from 'react';
import PropTypes from 'prop-types';

function ButtonAll({ setFiltered }) {
  const onClick = () => {
    setFiltered('');
  };
  return (
    <button
      type="button"
      className="filterButtons"
      data-testid="All-category-filter"
      onClick={ onClick }
    >
      All
    </button>
  );
}

ButtonAll.propTypes = {
  setFiltered: PropTypes.function,
}.isRequired;

export default ButtonAll;
