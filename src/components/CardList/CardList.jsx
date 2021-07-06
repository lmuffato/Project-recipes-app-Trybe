import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import useFilteredRecipes from '../../hooks/useFilteredRecipes';
import CardListContainer from './styles';

function CardList({ recipes, type, titleTestId, cardTestId }) {
  const { getFilteredRecipes,
    searchBarFilters, filteredRecipes } = useFilteredRecipes();

  useEffect(() => {
    getFilteredRecipes(type);
  }, [type, searchBarFilters, getFilteredRecipes]);

  if (recipes.length === 0) {
    return 'Loading...';
  }

  if (filteredRecipes.length === 1) {
    const recipe = filteredRecipes.find((el) => el === filteredRecipes[0]);
    return type === 'meals' ? (
      <Redirect
        to={ {
          pathname: `/comidas/${recipe.idMeal}`,
          state: { recipe, type },
        } }
      />
    ) : (
      <Redirect
        to={ {
          pathname: `/bebidas/${recipe.idDrink}`,
          state: { recipe, type },
        } }
      />
    );
  }

  return (
    <CardListContainer>
      { filteredRecipes.length > 1 ? (
        filteredRecipes.map((recipe, index) => (
          type === 'meals' ? (
            <Link
              to={ { pathname: `/comidas/${recipe.idMeal}`, state: { recipe, type } } }
              key={ index }
            >
              <Card recipe={ recipe } index={ index } type={ type } />
            </Link>
          ) : (
            <Link
              to={ { pathname: `/bebidas/${recipe.idDrink}`, state: { recipe, type } } }
              key={ index }
            >
              <Card recipe={ recipe } index={ index } type={ type } />
            </Link>
          )
        ))
      ) : (recipes.length > 0 && recipes.map((recipe, i) => (
        type === 'meals' ? (
          <Link
            to={ { pathname: `/comidas/${recipe.idMeal}`, state: { recipe, type } } }
            key={ i }
          >
            <Card
              recipe={ recipe }
              key={ i }
              index={ i }
              titleTestId={ titleTestId }
              cardTestId={ cardTestId }
            />
          </Link>
        ) : (
          <Link
            to={ { pathname: `/bebidas/${recipe.idDrink}`, state: { recipe, type } } }
            key={ i }
          >
            <Card
              recipe={ recipe }
              key={ i }
              index={ i }
              titleTestId={ titleTestId }
              cardTestId={ cardTestId }
            />
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
