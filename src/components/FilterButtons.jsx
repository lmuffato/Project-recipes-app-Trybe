import PropTypes from 'prop-types';
import React from 'react';

function FilterButtons({ categoryName, testId }) {
  return (
    <div>
      <button type="button" name="category" data-testid={ testId }>{categoryName}</button>
    </div>
  );
}

FilterButtons.propTypes = {
  categoryName: PropTypes.string,
  testId: PropTypes.string,
}.isRequired;

export default FilterButtons;
