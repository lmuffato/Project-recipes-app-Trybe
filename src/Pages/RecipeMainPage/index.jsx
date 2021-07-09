import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import RecipeCard from '../../Components/RecipeCard';
import recipesContext from '../../context/RecipesContext';

function RecipeMainPage({ header }) {
  const { recipes } = useContext(recipesContext);
  const toggle = (header.includes('Comidas')) ? 'meals' : 'drinks';
  return (
    <div>
      <Header>{ header }</Header>
      { recipes[toggle].results !== null
        ? <RecipeCard recipesArray={ recipes[toggle].results } />
        : ''}
      <Footer />
    </div>
  );
}

RecipeMainPage.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default RecipeMainPage;
