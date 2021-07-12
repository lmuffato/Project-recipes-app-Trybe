import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

function FilterButtons({ categoryName, testId }) {
  const { setFilterButton, setDrinkFilterButton,
    filterButton, drinkFilterButton } = useContext(FilterContext);
  const location = useLocation();

  const onClick = () => {
    if (location.pathname === '/comidas') {
      if (filterButton === categoryName) {
        setFilterButton('');
      } else { setFilterButton(categoryName); }
    }
    if (drinkFilterButton === categoryName) {
      setDrinkFilterButton('');
    } else { setDrinkFilterButton(categoryName); }
  };

  return (
    <div>
      <button
        type="button"
        name="category"
        className="filterButtons"
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
