import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import AppContext from '../../contexts/app/AppContext';

const getInProgressRecipes = () => {
  const dataLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return dataLS || false;
};

export default function StartRecipeButton(props) {
  const { screenActive } = useContext(AppContext);
  const history = useHistory();
  const { item } = props;
  const type = screenActive === 'food' ? 'comidas' : 'bebidas';
  const [textButton, setTextButton] = useState('Start Recipe');

  useEffect(() => {
    const dataLS = getInProgressRecipes();
    if (item.length && dataLS) {
      let check;
      if (type === 'comidas') {
        check = !!Object.keys(dataLS.meals).filter(
          (key) => key === item[0].idMeal,
        ).length;
      } else {
        check = !!Object.keys(dataLS.cocktails).filter(
          (key) => key === item[0].idDrink,
        ).length;
      }
      if (check) {
        setTextButton('Continue Recipe');
      }
    }
  }, [item]);

  return (
    item.length
      ? (
        <Button
          data-testid="start-recipe-btn"
          onClick={ () => {
            history.push(
              `/${type}/${screenActive === 'food'
                ? item[0].idMeal
                : item[0].idDrink}/in-progress`,
            );
          } }
        >
          { textButton }
        </Button>
      )
      : null
  );
}

StartRecipeButton.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

StartRecipeButton.defaultProps = {
  item: {},
};

const Button = styled.button`
  width: 80%;
  height: 50px;
  background-color: rgb(214, 168, 40);
  font-family: 'Montserrat';
  font-weight: bold;
  border-radius: 100px;
  position: fixed;
  bottom: 0px;
  margin: 0 auto;
  left: 0;
  right: 0;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 25px;
  color: white;
`;
