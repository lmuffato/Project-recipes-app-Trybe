import React, { useEffect, useState } from 'react';
import {
  useRouteMatch,
} from 'react-router-dom';
import ProgressCard from '../components/RecipeComponents/ProgressCard';
import '../styles/InProgressRecipes.css';

function ReceitasEmAndamento() {
  const { params, url } = useRouteMatch();
  const [response, setResponse] = useState(null);
  const [urlToFetch, setUrlToFetch] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (url === `/comidas/${params.id}/in-progress`) {
        setUrlToFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`);
      } else {
        setUrlToFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`);
      }
      const responseItem = await fetch(urlToFetch);
      const responseJson = await responseItem.json();
      setResponse(responseJson);
    };

    fetchRecipes();
  }, [params.id, url, urlToFetch]);
  return (
    <div className="in-progress-recipe">
      <h1 className="title">Revenue in progress</h1>
      {(response) ? <ProgressCard recipe={ response } /> : ''}
    </div>
  );
}
export default ReceitasEmAndamento;
