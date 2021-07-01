import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import RecipeCard from '../../Components/RecipeCard';
import recipesContext from '../../context/RecipesContext';

function RecipeMainPage({ header }) {
  const { recipes } = useContext(recipesContext);
  const { pathname } = useLocation();
  const toggle = (pathname.includes('comidas')) ? 'meals' : 'drinks';
  return (
    <div>
      <Header>{ header }</Header>
      { recipes[toggle].results !== null
        ? <RecipeCard recipesArray={ recipes[toggle].results } />
        : 'vazio'}
      <Footer />
    </div>
  );
}

RecipeMainPage.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default RecipeMainPage;
