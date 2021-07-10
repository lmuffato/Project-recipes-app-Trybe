import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Share from '../images/shareIcon.svg';
import IngredientsMeasure from '../compenents/IngredientsMeasure';

function MealsRecepiesProgress() {
  const [detailsRecepie, setDetailsRecepie] = useState();
  const [allChecked, setAllChecked] = useState(true);
  const history = useHistory();
  const recepiID = history.location.pathname.split('/')[2];

  // ao montar a pagina, faz api que traz infos via ID.
  useEffect(() => {
    const getRecepi = async () => {
      const detailsRecepi = await
      fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${recepiID}`)
        .then((response) => response.json())
        .then((respo) => respo.meals[0]);
      setDetailsRecepie(detailsRecepi);
    };

    getRecepi();
  }, [recepiID]);

  const { strMealThumb, strMeal, strCategory, strInstructions } = detailsRecepie;

  return (
    <div>
      <img ata-testid="recipe-photo" alt="meals recepi" src={ strMealThumb } />
      <h2 data-testid="recipe-title">{ strMeal }</h2>
      <button type="button" data-testid="share-btn">
        <img alt="compartilhar" width="50px" src={ Share } />
      </button>
      { /* <Componente fav/desfav> */ }
      <p data-testid="recipe-category">{ strCategory }</p>
      <p>Ingredients</p>
      <IngredientsMeasure
        detailsRecepie={ detailsRecepie }
        setAllChecked={ setAllChecked }
      />
      <p>Instruções</p>
      <p data-testid="instructions">{ strInstructions }</p>

      <Link to="/receitas/feitas">
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

export default MealsRecepiesProgress;
