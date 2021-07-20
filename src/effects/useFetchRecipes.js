import { useState, useEffect, useContext } from 'react';
import { RecipesContext } from '../context/RecipesContext';

const MAX_RECIPES = 12;

function useFetchRecipes(type) {
  const [fetchUrl, setFetchUrl] = useState('');
  const [recipesData, setRecipesData] = useState({});
  const { setRecipesContext } = useContext(RecipesContext);
  const fetchCategoriesUrl = type === 'meals' ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    if (!fetchUrl) return;
    const fetchRecipes = async () => {
      try {
        const res = await fetch(fetchUrl);
        const data = await res.json();

        const limitedData = {
          ...data,
          [type]: data[type].slice(0, MAX_RECIPES),
        };

        setRecipesContext(limitedData);
        setRecipesData(limitedData);
      } catch (err) {
        console.log(err, fetchUrl);
      }
    };

    fetchRecipes();
    return () => {
      cancel = true;
    };
  }, [fetchUrl, type, setRecipesContext, fetchCategoriesUrl]);

  return [recipesData, setFetchUrl];
}

export default useFetchRecipes;
