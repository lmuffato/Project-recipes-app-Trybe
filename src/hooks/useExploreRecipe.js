import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchSurprise } from '../services/data';
import getMealsOrDrinks from '../helper/mealsOrDrinksMethods';

export default function useExploreRecipe(type) {
  const { push, location } = useHistory();
  const [id, setId] = useState(0);

  const { idFood, portugueseFood, site, foods } = getMealsOrDrinks(type);

  const redirectToExplore = (typeRedirect) => {
    push(`${location.pathname}/${typeRedirect}`);
  };

  const redirectToSurprise = () => push(`/${portugueseFood}/${id}`);

  useEffect(() => {
    const fetchDidMount = async () => {
      const response = await fetchSurprise(site);
      const idResponse = response[foods][0][idFood];
      setId(idResponse);
    };

    fetchDidMount();
  }, []);

  return { redirectToExplore, redirectToSurprise };
}
