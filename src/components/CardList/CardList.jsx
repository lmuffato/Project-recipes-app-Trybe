import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import useFilteredRecipes from '../../hooks/useFilteredRecipes';

function CardList({ recipes, type }) {
  const { getFilteredRecipes,
    searchBarFilters, filteredRecipes } = useFilteredRecipes();

  useEffect(() => {
    getFilteredRecipes(type);
  }, [type, searchBarFilters, getFilteredRecipes]);

  // if (isLoading) {
  //   return 'Loading...';
  // }

  return (
    <div>
      { filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe, index) => (
          <Card recipe={ recipe } key={ index } index={ index } />
        ))
      ) : (recipes.length > 0 && recipes.map((recipe, i) => (
        <Card recipe={ recipe } key={ i } index={ i } />))
      )}
    </div>
  );
}

export default CardList;

CardList.propTypes = {
  recipes: PropTypes.shape(PropTypes.arrayOf(PropTypes.object)),
  type: PropTypes.string,
}.isRequired;
