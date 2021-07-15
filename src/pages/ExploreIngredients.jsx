import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import useFilteredRecipes from '../hooks/useFilteredRecipes';
import logoIcon from '../images/logoPaginasExplorar.svg';

function ExploreIngredients({ type }) {
  // const history = useHistory();
  const {
    setSearchBarFilters,
    searchBarFilters } = useFilteredRecipes();
  const [ingredients, setIngredients] = useState([]);
  const MAX_INGREDIENTS = 12;

  const fetchIngredientsFood = useCallback(async () => {
    if (type === 'meals') {
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const ingredientsFood = await data.json();
      setIngredients(ingredientsFood.meals.slice(0, MAX_INGREDIENTS));
    }
    if (type === 'drinks') {
      const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const ingredientsDrink = await data.json();
      setIngredients(ingredientsDrink.drinks.slice(0, MAX_INGREDIENTS));
    }
  }, [type]);

  useEffect(() => {
    fetchIngredientsFood();
  }, [fetchIngredientsFood]);

  const handleClick = useCallback((dataIngredients) => {
    // console.log(dataIngredients);
    // console.log(searchBarFilters);
    // await getFilteredRecipes(type);
    if (type === 'meals') {
      setSearchBarFilters(searchBarFilters.concat(dataIngredients));
      // history.push('/comidas');
    } else if (type === 'drinks') {
      console.log(type);
      setSearchBarFilters(searchBarFilters.concat(dataIngredients));
      // history.push('/bebidas');
    }
    // console.log(history);
  }, [searchBarFilters, setSearchBarFilters, type]);

  return (
    <div>
      <Header heading="Explorar Ingredientes" logoSrc={ logoIcon } />
      {ingredients.map((ingredient, index) => {
        const ingredientName = type === 'meals'
          ? ingredient.strIngredient
          : ingredient.strIngredient1;
        const dataIngredients = {
          inputSearch: ingredientName,
          radioValue: 'ingredient',
        };
        const imgUrl = type === 'meals'
          ? `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`
          : `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`;
        return (
          <Link
            // type="button"
            to={
              type === 'meals' ? '/comidas' : '/bebidas'
            }
            key={ index }
            onClick={ () => handleClick(dataIngredients) }
          >
            <div data-testid={ `${index}-ingredient-card` }>
              <div className="img-wrapper">
                <img
                  data-testid={ `${index}-card-img` }
                  // style={ { maxWidth: '100px' } }
                  src={ imgUrl }
                  alt="Ingredient food/drink"
                />
              </div>
              <div className="card-info">
                <p data-testid={ `${index}-card-name` }>
                  {ingredient.strIngredient1 || ingredient.strIngredient}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
      <Footer />
    </div>
  );
}

ExploreIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreIngredients;
