import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryBtn({ category: { strCategory } }) {
  return (
    <div>
      <button
        type="button"
        data-testid={ `${strCategory}-category-filter` }
      >
        { strCategory }
      </button>
    </div>
  );
}
CategoryBtn.propTypes = {

  category: PropTypes.string.isRequired,
};
