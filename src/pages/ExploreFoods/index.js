import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../../components/footerMenu';
import Header from '../../components/Header';
import { randomMeal } from '../../services/apiRequests';

export default function ExploreFoods() {
  document.title = 'Explorar Comidas';
  const [path, setPath] = useState('');
  const setRandomLink = ({ idMeal }) => setPath(`/comidas/${idMeal}`);
  randomMeal(setRandomLink);
  return (
    <div>
      <Header />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button type="button" data-testid="explore-by-area">
            Por Local de Origem
          </button>
        </Link>
        <Link to={ path }>
          <button type="button" data-testid="explore-surprise">
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <FooterMenu />
    </div>
  );
}
