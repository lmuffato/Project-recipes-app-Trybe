import React, { useContext } from 'react';
import CategoryBtn from './CategoryBtn';
import { AppContext } from '../../context/AppContext';

export default function Categories() {
  const { context } = useContext(AppContext);
  const { categoriesList } = context;

  return (
    <div>
      <button
        type="button"
        data-testid="all-category-filter"
      >
        All
      </button>
      { categoriesList.map(
        (category, index) => (
          <CategoryBtn
            category={ category }
            key={ index }
          />
        ),
      )}

    </div>
  );
}
