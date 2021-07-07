import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BottomBtn(props) {
  const iniciando = 'Iniciar Receita';
  const [buttonTxt, setbuttonTxt] = useState(iniciando);
  const id = window.location.pathname.match(/(\d+)/)[0];
  const { info } = props;
  const { idMeal, idDrink } = info;

  useEffect(() => {
    const toContinue = () => {
      const infoReceiver = {
        meals: {},
        cocktails: {},
      };
      const local = localStorage.getItem('inProgressRecipes');
      if (local === '' || local === null || local === infoReceiver) {
        setbuttonTxt(iniciando);
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
  }, [id]);

  const pathFinder = () => {
    if (idMeal !== undefined) {
      return (`/comidas/${idMeal}/in-progress`);
    }
    return (`/bebidas/${idDrink}/in-progress`);
  };

  return (
    <Link to={ pathFinder() }>
      <Button
        type="button"
        data-testid="start-recipe-btn"
        variant="secondary"
        className="startBtn"
      >
        {buttonTxt}
      </Button>
    </Link>
  );
}

BottomBtn.propTypes = {
  info: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default BottomBtn;
