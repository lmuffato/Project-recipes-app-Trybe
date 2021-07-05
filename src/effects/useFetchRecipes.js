import { useState, useEffect, useContext } from 'react';
import { RecipesContext } from '../context/RecipesContext';

const MAX_RECIPES = 12;

function useFetchRecipes(type) {
  const [fetchUrl, setFetchUrl] = useState('');
  const [recipesData, setRecipesData] = useState({});
  const { setRecipesContext } = useContext(RecipesContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (!fetchUrl) return;
        const res = await fetch(fetchUrl);
        const data = await res.json();

        const limitedData = {
          ...data,
          [type]: data[type].slice(0, MAX_RECIPES),
        };
        console.log('limitedData: ', limitedData);
        setRecipesContext(limitedData);
        setRecipesData(limitedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
  }, [type, fetchUrl, setRecipesContext]);

  return [recipesData, setFetchUrl];
}

export default useFetchRecipes;
