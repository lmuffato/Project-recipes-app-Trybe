import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shape } from 'prop-types';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer';
import Button from '../../components/shared/button';
import ItemCard from '../../components/ItemCard';
import recipesContext from '../../context/recipesContext/recipesContext';

function Drinks({ location }) {
  const {
    fetchRecipes,
    dataRecipes,
    loading,
    fetchCategoryRecipes,
    categorys,
    filterByCategory,
  } = useContext(recipesContext);

  useEffect(() => {
    fetchRecipes(location.pathname);
    fetchCategoryRecipes(location.pathname);
  }, []);

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
      {loading ? <span>Carregando...</span> : dataRecipes.map((drink, index) => (
        <Link to={ `/bebidas/${drink.idDrink}` } key={ drink.idDrink }>
          <ItemCard
            name={ drink.strDrink }
            image={ drink.strDrinkThumb }
            dataTestId={ index }
          />
        </Link>
      ))}
      <Footer />
    </div>

  );
}

Drinks.propTypes = {
  location: shape({}).isRequired,
};

export default Drinks;
