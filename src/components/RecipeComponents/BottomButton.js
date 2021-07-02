import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function BottomBtn(props) {
  const { info } = props;
  const { idMeal, idDrink } = info;
  let path = `/bebidas/${idDrink}/in-progress`;

  if (idMeal !== undefined) {
    path = `/comidas/${idMeal}/in-progress`;
  }

  return (
    <Link to={ path }>
      <Button
        type="button"
        data-testid="start-recipe-btn"
        variant="secondary"
        className="startBtn"
      >
        Iniciar Receita
      </Button>
    </Link>
  );
}

BottomBtn.propTypes = {
  info: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
