import React from 'react';

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
