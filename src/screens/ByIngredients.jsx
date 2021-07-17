import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import fechtIngredientsList from '../service/fechtIngredientsList';
import ContextRecipes from '../context/ContextRecipes';
import FooterBar from '../components/FooterBar';
import Card from '../components/Card';
import HeaderExplore from '../components/HeaderExplore';

function ByIngredients() {
  const { fetchByIngredients } = useContext(ContextRecipes);
  const [ingredients, setIngredients] = useState([]);
  const { pathname } = useLocation();
  const type = pathname.includes('comidas') ? 'Meal' : 'Drink';
  useEffect(() => {
    const getIngredients = async () => {
      const response = await fechtIngredientsList(type);
      return response;
    };
    getIngredients().then((r) => setIngredients(r));
  }, [type]);

  return (
    <main>
      <HeaderExplore />
      <section className="ingredients-container">
        {ingredients.map((ingredient, index) => {
          const testid = {
            image: `${index}-card-img`,
            title: `${index}-card-name`,
            card: `${index}-ingredient-card`,
          };
          const redirectPath = type === 'Meal' ? '/comidas' : '/bebidas';
          return (
            <button
              key={ index }
              type="button"
              onClick={ () => fetchByIngredients(ingredient.name, type) }
            >
              <Card
                src={ ingredient.thumb }
                title={ ingredient.name }
                index={ index }
                testid={ testid }
                redirectPath={ redirectPath }
              />
            </button>

          );
        })}
      </section>
      <FooterBar />
    </main>
  );
}

export default ByIngredients;
