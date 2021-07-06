import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchById, fetchName } from '../services/data';

const INITIAL_STATE = {
  meals: [{ strYoutube: '' }],
  drinks: [{ strYoutube: '' }],
};

export default function useRecipeDetails(type) {
  const recommendedSite = type === 'meal' ? 'cocktail' : 'meal';

  const { location } = useHistory();
  const [recipe, setRecipe] = useState(INITIAL_STATE);
  const [recommended, setRecommended] = useState(INITIAL_STATE);
  const id = location.pathname.split('/')[2];

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

  useEffect(() => {
    const fetchDidMount = async () => {
      const resultRecipe = await fetchById(type, id);
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
  };
}
