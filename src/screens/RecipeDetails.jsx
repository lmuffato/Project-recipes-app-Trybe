import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import fetchApiById from '../service/fetchApiById';
import Ingredients from '../components/Ingredients';
import Recommendations from '../components/Recomendations';
import HeaderDetailsInProgress from '../components/HeaderDetailsInProgress';
import Video from '../components/Video';
import Instructions from '../components/Instructions';
import ButtonStart from '../components/ButtonStart';

function RecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const [isLoalding, setIsLoalding] = useState(false);
  const type = pathname.includes('comidas') ? 'themealdb' : 'thecocktaildb';
  const url = pathname.includes('comidas') ? 'comidas' : 'bebidas';

  useEffect(() => {
    async function requestApi() {
      setIsLoalding(true);
      const request = await fetchApiById(type, id);
      setRecipe(request);
      setIsLoalding(false);
    }
    requestApi();
  }, [type, id]);

  return (
    <div>
      { isLoalding ? <h1>Loalding</h1>
        : (
          <main>
            <HeaderDetailsInProgress recipe={ recipe } />
            { recipe.strMeal ? <Video recipe={ recipe } /> : null }
            <Ingredients recipe={ recipe } />
            <Instructions instructions={ recipe.strInstructions } />
            <Recommendations recipe={ type } />
            <ButtonStart type={ url } id={ id } />
          </main>)}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default RecipeDetails;
