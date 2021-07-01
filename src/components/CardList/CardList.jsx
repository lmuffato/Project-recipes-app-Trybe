import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import useFilteredRecipes from '../../hooks/useFilteredRecipes';
import CardListContainer from './styles';

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
    <CardListContainer>
      { filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe, index) => (
          type === 'meals' ? (
            <Link
              to={ { pathname: `/comidas/${index}`, state: { recipe, type } } }
              key={ index }
            >
              <Card recipe={ recipe } index={ index } type={ type } />
            </Link>
          ) : (
            <Link
              to={ { pathname: `/bebidas/${index}`, state: { recipe, type } } }
              key={ index }
            >
              <Card recipe={ recipe } index={ index } type={ type } />
            </Link>
          )
        ))
      ) : (recipes.length > 0 && recipes.map((recipe, i) => (
        type === 'meals' ? (
          <Link
            to={ { pathname: `/comidas/${i}`, state: { recipe, type } } }
            key={ i }
          >
            <Card recipe={ recipe } key={ i } index={ i } />
          </Link>
        ) : (
          <Link
            to={ { pathname: `/bebidas/${i}`, state: { recipe, type } } }
            key={ i }
          >
            <Card recipe={ recipe } key={ i } index={ i } />
          </Link>)
      ))
      )}
    </CardListContainer>
  );
}

export default CardList;

CardList.propTypes = {
  recipes: PropTypes.shape(PropTypes.arrayOf(PropTypes.object)),
  type: PropTypes.string,
}.isRequired;
