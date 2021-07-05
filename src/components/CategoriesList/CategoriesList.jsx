import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetchRecipes from '../../effects/useFetchRecipes';

const MAX_CATEGORIES = 5;

function CategoriesList(props) {
  const { type } = props;
  const fetchCategoriesUrl = type === 'meals' ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const [, setFetchUrl] = useFetchRecipes(type);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(fetchCategoriesUrl);
      const data = await res.json();
      const treatedData = data[type]
        .slice(0, MAX_CATEGORIES)
        .map((category) => category.strCategory);
      setCategories(treatedData);
    };

    fetchCategories();
  }, [fetchCategoriesUrl, type]);

  const handleCategoryClick = (category) => {
    const fetchRecipesByCategoryUrl = type === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
      : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

    setFetchUrl(`${fetchRecipesByCategoryUrl}${category}`);
  };

  if (categories.length === 0) return 'Loading categories';

  return categories.map((category, index) => (
    <button
      type="button"
      data-testid={ `${category}-category-filter` }
      key={ index }
      onClick={ () => handleCategoryClick(category) }
    >
      { category }
    </button>
  ));
}

CategoriesList.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default CategoriesList;
