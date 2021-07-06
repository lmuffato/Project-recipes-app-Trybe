import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStateEasyRedux } from 'easy-redux-trybe';
import { useSelector } from 'react-redux';
import positions from '../../services/data';
import createIngredients from '../../services/functions';

function DrinkDetails(props) {
  const { match: { params: { id } } } = props;

  const [, setStateRedux] = useStateEasyRedux(DrinkDetails, {});

  useEffect(() => {
    const fetchRecipie = async () => {
      const requestDrink = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const recommendations = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');

      const [dataDrink, dataRecommendations] = await Promise
        .all([requestDrink, recommendations]);

      const resultDrink = await dataDrink.json();
      const responseDrink = resultDrink.drinks;

      const resultFoods = await dataRecommendations.json();
      const responseReccomendations = resultFoods.meals;
      const INDEX_END = 6;
      const resultReccomendations = responseReccomendations.slice(0, INDEX_END);
      setStateRedux({ actionType: 'FETCH_DRINK', responseDrink, resultReccomendations });
    };
    fetchRecipie();
  }, []);

  const drinks = useSelector((state) => (
    state.DrinkDetails ? state.DrinkDetails.responseDrink : undefined
  ));

  const verifyAlcohol = (el) => {
    if (el.strAlcoholic === 'Alcoholic') {
      return (<p>{ el.strAlcoholic }</p>);
    }
  };

  return (
    <div>
      Bebida de ID :
      { id }
      {drinks && drinks.map((el) => (
        <div className="teste-details" key={ el.idDrink }>
          <img src={ el.strDrinkThumb } alt={ el.strDrink } data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{ el.strDrink }</h1>
          <button type="button" data-testid="share-btn">compartilhar</button>
          <button type="button" data-testid="favorite-btn">favoritar</button>
          <p data-testid="recipe-category">
            { el.strCategory }
            {verifyAlcohol(el)}
          </p>
          <ul>
            {positions
              .map((position, index) => createIngredients({ el, position, index }))}
          </ul>
          <p data-testid="instructions">{ el.strInstructions }</p>
          <div data-testid="0-recomendation-card">recomendação</div>
          <button type="button" data-testid="start-recipe-btn">Iniciar</button>
        </div>

      ))}
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetails;
