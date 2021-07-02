import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

function FilterButtons({ categoryName, testId }) {
  const { setFilterButton, setDrinkFilterButton } = useContext(FilterContext);
  const location = useLocation();

  const onClick = () => {
    if (location.pathname === '/comidas') {
      setFilterButton(categoryName);
    } else { setDrinkFilterButton(categoryName); }
  };

  return (
    <div>
      <button
        type="button"
        name="category"
        data-testid={ testId }
        onClick={ onClick }
      >
        {categoryName}
      </button>
    </div>
  );
}

FilterButtons.propTypes = {
  categoryName: PropTypes.string,
  testId: PropTypes.string,
}.isRequired;

export default FilterButtons;
