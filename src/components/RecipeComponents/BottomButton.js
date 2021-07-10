import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

function BottomBtn(props) {
  const iniciando = 'Iniciar Receita';
  const { params } = useRouteMatch();
  const { id } = params;
  const { info } = props;
  const { idMeal, idDrink } = info;

  const toContinue = () => {
    const infoReceiver = {
      meals: {},
      cocktails: {},
    };
    const local = localStorage.getItem('inProgressRecipes');
    const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const favorites = JSON.parse(local);
    const button = document.getElementsByClassName('startBtn')[0];

    if (!favorites || local === infoReceiver) {
      return (iniciando);
    } if (localDone && localDone.find((e) => e.id === id && button)) {
      button.style.display = 'none';
    } else if (Object.values(favorites).filter((e) => e[id] >= 0).length > 0) {
      return ('Continuar Receita');
    }
    return (iniciando);
  };

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
        {toContinue()}
      </Button>
    </Link>
  );
}

BottomBtn.propTypes = {
  info: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default BottomBtn;
