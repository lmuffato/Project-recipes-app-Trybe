import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import RecipeCard from '../../Components/RecipeCard';
import recipesContext from '../../context/RecipesContext';
import { fetchByIngredient, getDrinks, getMeals } from '../../services/fetchRecipes';
import './styles.css';

function RecipeMainPage({ header, location: { state } }) {
  const { recipes, setRecipes } = useContext(recipesContext);
  const [isLoading, setIsLoading] = useState(true);
  const toggle = (header.includes('Comidas')) ? 'meals' : 'drinks';

  useEffect(() => {
    const handleFetching = async () => {
      if (state && state.previousPath.includes('ingredientes')) {
        const { ingredient } = state;
        await fetchByIngredient(ingredient, toggle).then((response) => {
          setRecipes({
            ...recipes,
            [toggle]: {
              results: response,
            },
          });
        });
        setIsLoading(false);
      } else {
        await getMeals().then((response) => {
          getDrinks().then((result) => {
            setRecipes({
              meals: { results: response },
              drinks: { results: result },
            });
          });
        });
        setIsLoading(false);
      }
    };

    handleFetching();
  }, []);

  return (
    <div className="main-page-parent">
      <Header>{ header }</Header>
      { isLoading ? 'Carregando' : (
        <div>
          { recipes[toggle].results !== null
            ? <RecipeCard recipesArray={ recipes[toggle].results } />
            : ''}
        </div>
      )}
      <Footer />
    </div>
  );
}

RecipeMainPage.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default RecipeMainPage;
