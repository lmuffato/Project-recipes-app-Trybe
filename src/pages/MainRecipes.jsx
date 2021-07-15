import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FoodContext from '../contexts/foods/FoodContext';
import DrinksContext from '../contexts/drinks/DrinksContext';
import ButtonFilters from '../components/ButtonFilters';
import Header from '../components/Header';
import Cards from '../components/Cards';
import LowerMenu from '../components/LowerMenu';
import '../components/card.css';

export default function MainRecipes({ categories, arrayCards,
  functionChangeFilter, elementFilter, setToggle, toggle }) {
  const twelve = 12;
  const { mealsToMap, radio } = useContext(FoodContext);
  const { drinksToMap } = useContext(DrinksContext);

  function meals() {
    return (
      <div className="mapped-cards">
        {arrayCards.filter((_obj, index) => index < twelve).map((recipe, index) => (
          <Cards
            id={ recipe.idDrink || recipe.idMeal }
            key={ index }
            index={ index }
            name={ recipe.strMeal || recipe.strDrink }
            thumbnail={ recipe.strMealThumb || recipe.strDrinkThumb }
            category={ recipe.strCategory }
          />
        ))}
      </div>
    );
  }

  function radioMeals() {
    return (
      <div className="search-cards">
        {mealsToMap !== null && mealsToMap.length > 0 ? mealsToMap
          .slice(0, twelve).map((meal, index) => (
            <Cards
              key={ index }
              id={ meal.idMeal }
              index={ index }
              name={ meal.strMeal }
              thumbnail={ meal.strMealThumb }
            />
          )) : ''}
        {drinksToMap !== null && drinksToMap.length > 0 ? drinksToMap
          .slice(0, twelve).map((drink, index) => (
            <Cards
              key={ index }
              id={ drink.idDrink }
              index={ index }
              name={ drink.strDrink }
              thumbnail={ drink.strDrinkThumb }
            />
          )) : ''}
      </div>
    );
  }

  return (
    <Container>
      <Header />
      <ButtonFilters
        toggle={ toggle }
        setToggle={ setToggle }
        elementFilter={ elementFilter }
        categories={ categories }
        functionChangeFilter={ functionChangeFilter }
      />
      <div className="main-cards">
        {radio.length > 0 ? radioMeals() : meals()}
      </div>
      <LowerMenu />
    </Container>
  );
}

MainRecipes.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  functionChangeFilter: PropTypes.func.isRequired,
  elementFilter: PropTypes.string.isRequired,
  setToggle: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
  arrayCards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Container = styled.div`
   
  .main-cards {
    margin: auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding-left: 45px;
  }

  .search-cards {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    width: 90vw;
    padding-right: 45px;
  }
`;
