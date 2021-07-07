import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import useFilteredRecipes from '../../hooks/useFilteredRecipes';
import CardListContainer from './styles';

function CardList({ recipes, type, titleTestId, cardTestId }) {
  const { getFilteredRecipes,
    searchBarFilters, filteredData } = useFilteredRecipes();
  const [receitasFiltradas, setReceitasFiltradas] = useState([]);
  // const { filteredRecipes } = useFilteredRecipes();
  // // const history = useHistory();

  useEffect(() => {
    let cancel = false;
    const getRecipes = async () => {
      await getFilteredRecipes(type);
      if (cancel) return;
      const values = Object.values(filteredData);
      setReceitasFiltradas(values);
    };
    getRecipes();
    return () => {
      cancel = true;
    };
  }, [type, searchBarFilters, getFilteredRecipes, filteredData]);

  if (recipes.length === 0) {
    return 'Loading...';
  }

  const filteredDataType = Object.keys(filteredData);

  if (receitasFiltradas.length === 1) {
    const recipe = receitasFiltradas[0].find((el) => el === receitasFiltradas[0][0]);

    return filteredDataType[0] === 'meals' ? (
      <Redirect
        to={ {
          pathname: `/comidas/${recipe.idMeal}`,
          state: { recipe, type: filteredDataType[0] },
        } }
      />
      // console.log('receitas filtradas', receitasFiltradas[0][0])
    ) : (
      <Redirect
        to={ {
          pathname: `/bebidas/${recipe.idDrink}`,
          state: { recipe, type: filteredDataType[0] },
        } }
      />
    );
  }

  return (
    <CardListContainer>
      { receitasFiltradas.length > 1 ? (
        receitasFiltradas.map((recipe, index) => (
          type === 'meals' ? (
            <Link
              to={ { pathname: `/comidas/${recipe.idMeal}`, state: { recipe, type } } }
              key={ index }
            >
              <Card
                recipe={ recipe }
                index={ index }
                type={ type }
                titleTestId={ titleTestId }
                cardTestId={ cardTestId }
              />
            </Link>
          ) : (
            <Link
              to={ { pathname: `/bebidas/${recipe.idDrink}`, state: { recipe, type } } }
              key={ index }
            >
              <Card
                recipe={ recipe }
                index={ index }
                type={ type }
                titleTestId={ titleTestId }
                cardTestId={ cardTestId }
              />
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
