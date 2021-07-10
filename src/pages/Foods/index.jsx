import React, { useContext, useEffect } from 'react';
import { shape } from 'prop-types';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer';
import Button from '../../components/shared/button';
// import ItemCard from '../../components/ItemCard';
import recipesContext from '../../context/recipesContext/recipesContext';
import CardRecipe from '../../components/CardRecipe';

const LIMIT_RECIPES = 12;

function Foods({ location }) {
  const {
    fetchRecipes,
    recipes,
    typeFilter,
    loading,
    fetchCategoryRecipes,
    categorys,
    filterByCategory } = useContext(recipesContext);

  useEffect(() => {
    fetchRecipes(location.pathname);
    fetchCategoryRecipes(location.pathname);
  }, []);
  return (

    <div>
      <Header location={ location } pageTitle="Comidas" />
      <Button
        name="All"
        dataTestid="All-category-filter"
        type="button"
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
      { loading ? <span>carregando</span> : recipes
        .filter((item, index) => index < LIMIT_RECIPES)
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

Foods.propTypes = {
  location: shape({}).isRequired,
};

export default Foods;
