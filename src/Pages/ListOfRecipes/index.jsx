import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header';
import ButtonByCategory from '../../Components/ButtonByCategory';
// import FavoritesCard from '../../Components/FavoritesCard';
// import recipesContext from '../../context/RecipesContext';

function ListOfRecipes({ header }) {
  // const { favoriteRecipes } = useContext(recipesContext);
  // const { favRecipes } = favoriteRecipes;
  return (
    <div>
      <Header>{ header }</Header>
      <ButtonByCategory />
      {/* <FavoritesCard recipeArray={ favRecipes } /> */}
    </div>
  );
}

ListOfRecipes.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default ListOfRecipes;
