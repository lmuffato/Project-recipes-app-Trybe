import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import useFetchRecipes from '../effects/useFetchRecipes';
import CardList from '../components/CardList/CardList';
import { RecipesContext } from '../context/RecipesContext';
import AreasList from '../components/AreasList/AreasList';

function ExploreOrigin() {
  const [, setFetchUrl] = useFetchRecipes('meals');
  const { recipesContext } = useContext(RecipesContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setFetchUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  }, [setFetchUrl]);

  useEffect(() => {
    if (recipesContext.meals) setRecipes(recipesContext.meals); // pega do estado global e seta no estado da pg
  }, [recipesContext]);

  return (
    <>
      <Header>
        <h2 data-testid="page-title">Explorar Origem</h2>

      </Header>
      <AreasList />
      <CardList recipes={ recipes } type="meals" />
      <Footer />
    </>
  );
}

export default ExploreOrigin;
