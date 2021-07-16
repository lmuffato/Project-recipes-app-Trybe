import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import app from '../configs/configs';
import AppContext from '../contexts/app/AppContext';
import drinkIcon from '../icons/appIcons/bebidas.png';
import exploreIcon from '../icons/appIcons/explorar.png';
// import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../icons/appIcons/comidas.png';
// import mealIcon from '../images/mealIcon.svg';

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
            <img className="drinkIcon" src={ drinkIcon } alt="Drink icon" />
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
            <img className="exploreIcon" src={ exploreIcon } alt="Explore icon" />
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
            <img className="exploreIcon" src={ mealIcon } alt="Meal icon" />
          </button>
        </li>
      </ul>
    </Container>
  );
}

const Container = styled.div` align-items: center;
  background-color: rgb(214, 168, 40);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  bottom: 0;
  box-shadow: 0 -3px 4px 0 rgba(0, 0, 0, 0.55);
  display: flex;
  height: 58px;
  left: 0;
  position: fixed;
  width: 100%;

  ul {
    align-items: center;
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  ul li {
    display: flex;
  }

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    outline: inherit;
    padding: 0;
  }

  .drinkIcon {
    height: 40px;
    width: 29px;
  }

  .exploreIcon {
    height: 47px;
    width: 47px;
  }

`;
