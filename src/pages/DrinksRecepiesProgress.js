import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Share from '../images/shareIcon.svg';
import DrinkIngredientsMeasure from '../compenents/DrinkIngredientsMeasure';
import RecipesContext from '../contexts/RecipesContext';

const copy = require('clipboard-copy');

function DrinksRecepiesProgress() {
  const [detailsRecepie, setDetailsRecepie] = useState();
  const { allChecked } = useContext(RecipesContext);
  const history = useHistory();
  const recepiID = history.location.pathname.split('/')[2];

  // ao montar a pagina, faz api que traz infos via ID.
  useEffect(() => {
    console.log(recepiID);
    const getRecepi = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recepiID}`;
      const returnFetch = await fetch(endpoint);
      const dataJson = await returnFetch.json();
      const { drinks } = dataJson;
      setDetailsRecepie(drinks[0]);
    };
    getRecepi();
  }, []);

  function copyLink() {
    const linkToCopy = `/bebidas/${recepiID}`;
    copy(linkToCopy);
    global.alert('Link copiado!');
  }

  if (detailsRecepie === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt="drinks recepi"
        src={ detailsRecepie.strImageSource }
        width="50px"
      />
      <h2 data-testid="recipe-title">{ detailsRecepie.strDrink }</h2>
      <button type="button" data-testid="share-btn" onClick={ copyLink }>
        <img alt="compartilhar" width="50px" src={ Share } />
      </button>
      { /* <Componente fav/desfav> */ }
      <p data-testid="recipe-category">{ detailsRecepie.strAlcoholic }</p>
      <p>Ingredients</p>
      <DrinkIngredientsMeasure
        detailsRecepie={ detailsRecepie }
      />
      <p>Instruções</p>
      <p data-testid="instructions">{ detailsRecepie.strInstructions }</p>

      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ allChecked }
        >
          Finalizar receita
        </button>
      </Link>
    </div>
  );
}

export default DrinksRecepiesProgress;
