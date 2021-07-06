import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import getMealsOrDrinks from '../helper/mealsOrDrinksMethods';
import { fetchById, fetchName } from '../services/data';

const INITIAL_STATE = {
  meals: [{ strYoutube: '' }],
  drinks: [{ strYoutube: '' }],
};

const copy = require('clipboard-copy');

export default function useRecipeDetails(type) {
  const { recommendedSite, portugueseFood, site } = getMealsOrDrinks(type);

  const { location, push } = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(INITIAL_STATE);
  const [recommended, setRecommended] = useState(INITIAL_STATE);

  const getIngredientsAndMeasures = (rcp) => {
    const entriesRecipe = Object.entries(rcp);

    const ingredients = entriesRecipe.reduce(
      (acc, [key, value]) => {
        if (key.includes('strIngredient') && value) return acc.concat(value);
        return acc;
      },
      [],
    );
    const measures = entriesRecipe.reduce((acc, [key, value]) => {
      if (key.includes('strMeasure') && value) return acc.concat(value);
      return acc;
    }, []);

    return { ingredients, measures };
  };

  const filterRecommended = (rec) => {
    const maxLengthRecipes = 6;
    const filteredRecommended = rec.filter(
      (drink, index) => index < maxLengthRecipes,
    );
    return filteredRecommended;
  };

  const redirectToProgressPage = () => {
    push(`/${portugueseFood}/${id}/in-progress`);
  };

  const copyToClipBoard = () => {
    copy(`http://localhost:3000${location.pathname}`);
    alert('Link copiado!');
  };

  useEffect(() => {
    const fetchDidMount = async () => {
      const resultRecipe = await fetchById(site, id);
      const resultRecommended = await fetchName(recommendedSite);
      setRecipe(resultRecipe);
      setRecommended(resultRecommended);
    };

    fetchDidMount();
  }, []);

  return {
    recipe,
    recommended,
    getIngredientsAndMeasures,
    filterRecommended,
    redirectToProgressPage,
    copyToClipBoard,
  };
}
