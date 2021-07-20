import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/ExplorarComidasIng.css';

import { fetchFoodIngredients } from '../services/mealAPI';

import IngredientCard from '../components/ExplorarIngredientes/IngredientCard';

export default function ExplorarComidasIng() {
  const [ingredients, setIngredients] = useState([]);
  const amountOfIngredientsToDisplay = 12;

  useEffect(() => {
    fetchFoodIngredients().then((data) => {
      const displayIngredients = data.meals.slice(0, amountOfIngredientsToDisplay);
      setIngredients(displayIngredients);
    });
  }, []);

  return (
    <div className="explorar-comidas-ing">
      <Header
        title="Explore by Ingredients"
        enableSearchIcon={ false }
      />
      <div className="main-container-ing-foods">
        {ingredients && ingredients.map((ing, index) => (
          <IngredientCard
            key={ index }
            ingredient={ ing }
            type="comidas"
            index={ index }
          />
        ))}
      </div>
      <Footer />
      <br />
      <br />
      <br />
    </div>
  );
}
