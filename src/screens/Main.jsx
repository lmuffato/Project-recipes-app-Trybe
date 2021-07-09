import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import FooterBar from '../components/FooterBar';
import Card from '../components/Card';
import CategoriesButtons from '../components/CategoriesButtons';
import '../styleSheets/Main.css';

function Main() {
  const { getRecipes, getCategories, filteredRecipe } = useContext(ContextRecipes);
  const { pathname } = useLocation();
  const type = pathname === '/comidas' ? 'Meal' : 'Drink';
  const cardsQuantity = 12;
  useEffect(() => {
    getRecipes('All', type);
    getCategories(type);
  }, [pathname]);
  return (
    <main className="main-container">
      <section className="content-container">
        <section className="recipe-cards-container">
          { filteredRecipe.reduce((acc, recipe, index) => {
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
