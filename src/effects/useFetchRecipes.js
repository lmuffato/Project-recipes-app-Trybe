import { useState, useEffect, useContext } from 'react';
import { RecipesContext } from '../context/RecipesContext';

const MAX_RECIPES = 12;

function useFetchRecipes(type) {
  const [fetchUrl, setFetchUrl] = useState('');
  const [recipesData, setRecipesData] = useState({});
  const { setRecipesContext, prevFetchUrl, setPrevUrl } = useContext(RecipesContext);

  useEffect(() => {
    if (!fetchUrl || fetchUrl === prevFetchUrl) return;
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
        setPrevUrl(fetchUrl);
        console.log('useFetchRecipes useEffect ', limitedData);
      } catch (err) {
        console.log(err, fetchUrl);
        console.log('Error block TYPE', type);
      }
    };

    fetchRecipes();
  }, [fetchUrl, type, setRecipesContext, prevFetchUrl, setPrevUrl]);

  return [recipesData, setFetchUrl];
}

export default useFetchRecipes;
