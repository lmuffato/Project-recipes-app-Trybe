import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStateEasyRedux } from 'easy-redux-trybe';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import positions from '../../services/data';
import createIngredients from '../../services/functions';
import shareIcon from '../../images/shareIcon.svg';

import styles from '../../styles/DetailsPages.module.scss';

function DrinkDetails(props) {
  const { match: { params: { id } } } = props;

  const history = useHistory();
  const [, setStateRedux] = useStateEasyRedux(DrinkDetails, {});
  const [, setCopyUrl] = useStateEasyRedux({ name: 'copyDrink' }, {});

  useEffect(() => {
    const fetchRecipie = async () => {
      const requestDrink = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const recommendations = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');

      const [dataDrink, dataRecommendations] = await Promise
        .all([requestDrink, recommendations]);

      const resultDrink = await dataDrink.json();
      const responseDrink = resultDrink.drinks;

      const resultFoods = await dataRecommendations.json();
      const responseRecommendations = resultFoods.meals;
      const INDEX_END = 6;
      const resultRecommendations = responseRecommendations.slice(0, INDEX_END);
      setStateRedux({ actionType: 'FETCH_DRINK', responseDrink, resultRecommendations });
      setCopyUrl({ actionType: 'COPY_URL', copyRecipie: false });
    };
    fetchRecipie();
  }, []);

  const drinks = useSelector((state) => (
    state.DrinkDetails ? state.DrinkDetails.responseDrink : undefined
  ));

  const foodRecommendations = useSelector((state) => (
    state.DrinkDetails ? state.DrinkDetails.resultRecommendations : undefined
  ));

  const copyTrue = useSelector((state) => (
    state.copyDrink ? state.copyDrink.copyRecipie : undefined
  ));

  const verifyAlcohol = (el) => {
    if (el.strAlcoholic === 'Alcoholic') {
      return (<p>{ el.strAlcoholic }</p>);
    }
  };

  const choiceRec = (element) => history.push(`/comidas/${element}`);

  const copyUrl = () => {
    copy(window.location.href.toString());
    setCopyUrl({ copyRecipie: true });
    const time = 3000;
    setTimeout(() => {
      setCopyUrl({ copyRecipie: false });
    }, time);
  };

  return (
    <div>
      {drinks && drinks.map((el) => (
        <div className={ styles.areaRecipie } key={ el.idDrink }>
          <img src={ el.strDrinkThumb } alt={ el.strDrink } data-testid="recipe-photo" />
          <div className={ styles.containerContent }>
            {copyTrue && <span className={ styles.copyUrl }>Link copiado!</span>}
            <div className={ styles.headerContent }>
              <h1 data-testid="recipe-title">{ el.strDrink }</h1>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ () => copyUrl() }
              >
                <img src={ shareIcon } alt="Compartilhar" />
              </button>
              <button type="button" data-testid="favorite-btn">favoritar</button>
            </div>
            <p data-testid="recipe-category">
              { el.strCategory }
              {verifyAlcohol(el)}
            </p>
            <h3>Ingredients</h3>
            <ul>
              {positions
                .map((position, index) => createIngredients({ el, position, index }))}
            </ul>
            <h3>Instructions</h3>
            <p data-testid="instructions">{ el.strInstructions }</p>
            <h3>Recommendations</h3>
            <div className={ styles.carousel }>
              {foodRecommendations && foodRecommendations.map((element, index) => (
                <div
                  key={ element.idMeal }
                  data-testid={ `${index}-recomendation-card` }
                  className={ styles.cardRecommendation }
                  onClick={ () => choiceRec(element.idMeal) }
                  aria-hidden="true"
                >
                  <img src={ element.strMealThumb } alt="Food" />
                  <h3 data-testid={ `${index}-recomendation-title` }>
                    { element.strMeal }
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className={ styles.startRecipie }
          >
            Iniciar Receita
          </button>
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
