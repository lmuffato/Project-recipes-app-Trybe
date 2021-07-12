import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../../components/footerMenu';
import Header from '../../components/Header';
import { randomDrink } from '../../services/apiRequests';

export default function ExploreDrinks() {
  document.title = 'Explorar Bebidas';
  const [path, setPath] = useState('');
  const setRandomLink = ({ idDrink }) => setPath(`/bebidas/${idDrink}`);
  randomDrink(setRandomLink);
  return (
    <div>
      <Header />
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
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
