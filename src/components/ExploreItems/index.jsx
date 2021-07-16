import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import searchRandomDrink from '../../services/searchRandomDrink';
import searchRandomFood from '../../services/searchRandomFood';

export default function ExploreItems() {
  const history = useHistory();
  const { pathname } = history.location;
  const idLink = pathname.split('explorar')[1];
  const [id, setId] = useState('');
  const [redirect, setRedirect] = useState(false);
  const conditionalButton = () => {
    if (!pathname.includes('bebidas')) {
      return (
        <Link
          className="button"
          data-testid="explore-by-area"
          to={ `${pathname}/area` }
        >
          Por Local de Origem
        </Link>
      );
    }
  };
  const handleButton = async () => {
    if (pathname.includes('comidas')) {
      const api = await searchRandomFood();
      setId(api.idMeal);
      setRedirect(true);
    } else {
      const api = await searchRandomDrink();
      setId(api.idDrink);
      setRedirect(true);
    }
  };
  return (
    <div className="container">
      <Link
        data-testid="explore-by-ingredient"
        to={ `${pathname}/ingredientes` }
        className="button"
      >
        Por Ingredientes
      </Link>
      { conditionalButton()}
      <button
        className="button"
        onClick={ handleButton }
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
      {redirect && <Redirect to={ `${idLink}/${id}` } />}
    </div>
  );
}
