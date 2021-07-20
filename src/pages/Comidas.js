import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import CategoryButtons from '../components/Main/CategoryButtons';
import RecipeCard from '../components/Main/RecipeCard';
import Footer from '../components/Footer';
import FoodContext from '../contexts/FoodContext';
import '../style/Comidas.css';

export default function Comidas() {
  const NUMBER_OF_RECIPES = 12;
  const { pathname } = useLocation();
  const { foods, categories } = useContext(FoodContext);

  return (
    <div className="main-foods">
      <Header title="Foods" />
      <CategoryButtons categories={ categories } />
      <div className="cards">
        <ul>
          { foods && foods.slice(0, NUMBER_OF_RECIPES)
            .map((recipe, index) => (
              <RecipeCard
                key={ index }
                recipe={ recipe }
                index={ index }
                type={ pathname }
              />
            ))}
        </ul>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
