import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetchRecipes from '../../effects/useFetchRecipes';
import CategoriesListContainer from './styles';

const MAX_CATEGORIES = 5;

function CategoriesList(props) {
  const { type } = props;
  const fetchCategoriesUrl = type === 'meals' ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const [, setFetchUrl] = useFetchRecipes(type);
  const [categories, setCategories] = useState([]);
  const [lastCategoryClicked, setLastCategoryClicked] = useState('');

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
    if (lastCategoryClicked !== category && category !== 'All') {
      const fetchRecipesByCategoryUrl = type === 'meals'
        ? 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
        : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

      setLastCategoryClicked(category);
      return setFetchUrl(`${fetchRecipesByCategoryUrl}${category}`);
    }

    if (category === 'All') {
      setLastCategoryClicked('All');
    } else {
      setLastCategoryClicked('');
    }

    if (type === 'meals') return setFetchUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    return setFetchUrl('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  };

  if (categories.length === 0) return 'Loading categories';

  return (
    <CategoriesListContainer>
      { categories.map((category, index) => (
        <button
          type="button"
          data-testid={ `${category}-category-filter` }
          key={ index }
          onClick={ () => handleCategoryClick(category) }
        >
          { category }
        </button>
      )) }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleCategoryClick('All') }
      >
        All
      </button>
    </CategoriesListContainer>
  );
}

CategoriesList.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default CategoriesList;
