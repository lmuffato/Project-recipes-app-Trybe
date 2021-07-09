import React, { useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import FooterBar from '../components/FooterBar';
import SearchBar from '../components/SearchBar';

import Card from '../components/Card';
import CategoriesButtons from '../components/CategoriesButtons';
import '../styleSheets/Main.css';

function Main() {
  const { getRecipes, getCategories, filteredRecipe,
    searchBtn } = useContext(ContextRecipes);
  const { pathname } = useLocation();
  const history = useHistory();
  const type = pathname === '/comidas' ? 'Meal' : 'Drink';
  const cardsQuantity = 12;

  useEffect(() => {
    if (searchBtn && filteredRecipe && filteredRecipe.length === 1) {
      history.push(`${pathname}/${filteredRecipe[0].idMeal}`);
    }
    if (searchBtn && !filteredRecipe) {
      const ms = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
      return window.alert(ms);
    }
  }, [searchBtn]);

  useEffect(() => {
    getRecipes('All', type);
    getCategories(type);
  }, [pathname]);
  return (
    <main className="main-container">
      <SearchBar />
      <section className="content-container">
        <section className="recipe-cards-container">
          { filteredRecipe && filteredRecipe.reduce((acc, recipe, index) => {
            if (index < cardsQuantity) {
              acc.push(
                <Card
                  src={ recipe[`str${type}Thumb`] }
                  title={ recipe[`str${type}`] }
                  id={ recipe[`id${type}`] }
                  index={ index }
                  key={ index }
                  data
                />,
              );
            }
            return acc;
          }, []) }
        </section>
        <CategoriesButtons type={ type } />
      </section>

      <FooterBar />
    </main>
  );
}

export default Main;
