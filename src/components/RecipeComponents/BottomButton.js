import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BottomBtn(props) {
  const iniciando = 'Iniciar Receita';
  const [buttonTxt, setbuttonTxt] = useState(iniciando);
  const id = window.location.pathname.match(/(\d+)/)[0];
  const { info, inProgress } = props;
  const { idMeal, idDrink } = info;

  // const listCreator = () => {
  //   const ingredients = [];
  //   const quantity = [];
  //   const ingList = [];
  //   Object.entries(info)
  //     .filter((e) => e[0].indexOf('strIngredient') === 0 && e[1] !== '' && e[1] !== null)
  //     .map((e) => ingredients.push(e[1]));
  //   Object.entries(info)
  //     .filter((e) => e[0].indexOf('strMeasure') === 0 && e[1] !== '')
  //     .map((e) => quantity.push(e[1]));
  //   ingList.push(ingredients.map((e, i) => (`${e} ${quantity[i]}`)));
  //   return (ingList);
  // };

  useEffect(() => {
    const toContinue = () => {
      const local = localStorage.getItem('inProgressRecipes');
      if (local === '' || local === null || local === inProgress) {
        setbuttonTxt(iniciando);
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
      } else {
        const favoritesFoods = Object.entries(JSON.parse(local).meals);
        const filterfood = favoritesFoods.find((e) => e[0] === id);
        const favoriteDrinks = Object.entries(JSON.parse(local).cocktails);
        const filterdrinks = favoriteDrinks.find((e) => e[0] === id);
        return (filterfood !== undefined || filterdrinks !== undefined
          ? setbuttonTxt('Continuar Receita') : setbuttonTxt(iniciando));
      }
    };
    toContinue();
  }, [id, inProgress]);

  const pathFinder = () => {
    if (idMeal !== undefined) {
      return (`/comidas/${idMeal}/in-progress`);
    }
    return (`/bebidas/${idDrink}/in-progress`);
  };

  const idProgress = {
    [id]: [],
  };

  const localStoragePush = () => {
    const local = localStorage.getItem('inProgressRecipes');
    const favorites = JSON.parse(local);
    if (idMeal !== undefined) {
      const meals = { ...favorites.meals, ...idProgress };
      const foodState = { ...favorites, meals };
      localStorage.setItem('inProgressRecipes', JSON.stringify(foodState));
    } else {
      const cocktails = { ...favorites.cocktails, ...idProgress };
      const drinkState = { ...favorites, cocktails };
      localStorage.setItem('inProgressRecipes', JSON.stringify(drinkState));
    }
  };

  const handleClick = () => {
    localStoragePush();
  };

  return (
    <Link to={ pathFinder() }>
      <Button
        type="button"
        data-testid="start-recipe-btn"
        variant="secondary"
        className="startBtn"
        onClick={ handleClick }
      >
        {buttonTxt}
      </Button>
    </Link>
  );
}

BottomBtn.propTypes = {
  info: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  inProgress: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default BottomBtn;
