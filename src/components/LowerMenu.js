import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import app from '../configs/configs';
import AppContext from '../contexts/app/AppContext';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function LowerMenu() {
  const { setScreenActive } = useContext(AppContext);
  const history = useHistory();
  return (
    <Container data-testid="footer">
      <ul>
        <li>
          <button
            type="button"
            data-testid="drinks-bottom-btn"
            onClick={ () => {
              setScreenActive(app.screens.drink);
              history.push('/bebidas');
            } }
            src={ drinkIcon }
          >
            <img src={ drinkIcon } alt="Drink icon" />
          </button>
        </li>
        <li>
          <button
            type="button"
            data-testid="explore-bottom-btn"
            onClick={ () => {
              history.push('/explorar');
            } }
            src={ exploreIcon }
          >
            <img src={ exploreIcon } alt="Explore icon" />
          </button>
        </li>
        <li>
          <button
            type="button"
            data-testid="food-bottom-btn"
            onClick={ () => {
              setScreenActive(app.screens.food);
              history.push('/comidas');
            } }
            src={ mealIcon }
          >
            <img src={ mealIcon } alt="Meal icon" />
          </button>
        </li>
      </ul>
    </Container>
  );
}

const Container = styled.div`
  background-color:  rgb(214, 168, 40);
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 58px;
  left: 0;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  width: 100%;
  box-shadow: 0px -2px 4px 1px rgba(0,0,0,0.65);

  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  ul li {
    display: flex;
  }

  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;
