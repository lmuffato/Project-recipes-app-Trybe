import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

import drinkImg from '../../images/drinkIcon.svg';
import foodImg from '../../images/mealIcon.svg';
import exploreImg from '../../images/exploreIcon.svg';

export default function Footer() {
  return (
    <Container data-testid="footer">
      <Content>
        <li>
          <Link to="/bebidas">
            <img
              src={ drinkImg }
              alt="Ícone de bebida"
              data-testid="drinks-bottom-btn"
            />
          </Link>
        </li>
        <li>
          <Link to="/explorar">
            <img
              src={ exploreImg }
              alt="Ícone de bússola"
              data-testid="explore-bottom-btn"
            />
          </Link>
        </li>
        <li>
          <Link to="/comidas">
            <img
              src={ foodImg }
              alt="Ícone de comida"
              data-testid="food-bottom-btn"
            />
          </Link>
        </li>
      </Content>
    </Container>
  );
}
