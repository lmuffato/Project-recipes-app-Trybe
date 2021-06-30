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
          <Link to="/bebidas" data-testid="drinks-bottom-btn">
            <img src={ drinkImg } alt="Ícone de bebida" />
          </Link>
        </li>
        <li>
          <Link to="/explorar" data-testid="explore-bottom-btn">
            <img src={ exploreImg } alt="Ícone de bússola" />
          </Link>
        </li>
        <li>
          <Link to="/comidas" data-testid="food-bottom-btn">
            <img src={ foodImg } alt="Ícone de comida" />
          </Link>
        </li>
      </Content>
    </Container>
  );
}
