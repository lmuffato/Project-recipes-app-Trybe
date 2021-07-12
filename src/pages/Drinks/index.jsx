import React, { useContext, useEffect, useState } from 'react';
import { shape } from 'prop-types';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer';
import Button from '../../components/shared/button';
import recipesContext from '../../context/recipesContext/recipesContext';
import CardRecipe from '../../components/CardRecipe';

import { getDrinksByIngredients } from '../../service/recipesApi';

const LIMIT_RECIPES = 12;

function Drinks({ location }) {
  const {
    fetchRecipes,
    recipes,
    loading,
    fetchCategoryRecipes,
    categorys,
    filterByCategory,
    typeFilter,
    forIngredients,
  } = useContext(recipesContext);
  const [recipesForIngredients, setRecipesForIngredients] = useState([]);

  const fetchApiForIngredients = async () => {
    const { state } = location;
    if (state) {
      const data = await getDrinksByIngredients(state);
      const filter = data.drinks.filter((drink, index) => index < LIMIT_RECIPES);
      console.log(filter);
      setRecipesForIngredients(filter);
    }
  };

  useEffect(() => {
    fetchRecipes(location.pathname);
    fetchCategoryRecipes(location.pathname);
  }, []);

  useEffect(() => {
    fetchApiForIngredients();
  }, [forIngredients]);

  const allRecipes = recipesForIngredients.length > 1 ? recipesForIngredients : recipes;

  return (

    <div>
      <Header location={ location } pageTitle="Bebidas" />
      <Button
        name="All"
        type="button"
        dataTestid="All-category-filter"
        onClick={ () => fetchRecipes(location.pathname) }
      />
      {categorys.map((category, index) => (
        <Button
          type="button"
          onClick={ () => filterByCategory(category.strCategory, location.pathname) }
          name={ category.strCategory }
          key={ index }
          dataTestid={ `${category.strCategory}-category-filter` }
        />))}
      { loading ? <span>carregando</span> : allRecipes
        .filter((_item, index) => index < LIMIT_RECIPES)
        .map((recipe, index) => (
          <CardRecipe
            typeFilter={ typeFilter }
            key={ index }
            index={ index }
            recipe={ recipe }
          />
        ))}
      <Footer />
    </div>

  );
}

Drinks.propTypes = {
  location: shape({}).isRequired,
};

export default Drinks;
