import { useState, useEffect, useContext } from 'react';
import { RecipesContext } from '../context/RecipesContext';

const MAX_RECIPES = 12;

function useFetchRecipes(type) {
  const typeUrl = type === 'meals' ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const [fetchUrl] = useState(typeUrl);
  const [recipesData, setRecipesData] = useState({});
  const { setRecipesContext } = useContext(RecipesContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(fetchUrl);
        const data = await res.json();

        const limitedData = {
          ...data,
          recipes: data[type].slice(0, MAX_RECIPES),
        };

        console.log(data);
        console.log(data);

        setRecipesContext(limitedData);
        setRecipesData(limitedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
  }, [type, fetchUrl, setRecipesContext]);

  return recipesData;
}

export default useFetchRecipes;
