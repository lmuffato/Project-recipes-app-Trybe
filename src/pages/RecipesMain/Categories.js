import React, { useEffect, useState } from 'react';
import CategoryBtn from './CategoryBtn';
import { fetchCategoriesApi } from '../../services/fetchApiMain';

export default function Categories() {
  const [categoriesList, setCategoriesList] = useState([]);
  const drinkOrFood = 'drink'; // informação mockada - virá do context!
  const NUM_CATEG_SHOWN = 5;

  useEffect(() => {
    fetchCategoriesApi(drinkOrFood)
      .then((categories) => {
        console.log(categories);
        categories.splice(NUM_CATEG_SHOWN, categories.length - 1);
        setCategoriesList(categories);
      });
  }, []);

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
