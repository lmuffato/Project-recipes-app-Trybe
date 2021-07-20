import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/ExplorarBebidasIng.css';

import { fetchDrinkIngredients } from '../services/cocktailAPI';

import IngredientCard from '../components/ExplorarIngredientes/IngredientCard';

export default function ExplorarBebidasIng() {
  const [ingredients, setIngredients] = useState([]);
  const amountOfIngredientsToDisplay = 12;

  useEffect(() => {
    fetchDrinkIngredients().then((data) => {
      const displayIngredients = data.drinks.slice(0, amountOfIngredientsToDisplay);
      setIngredients(displayIngredients);
    });
  }, []);

  return (
    <div className="explorar-bebidas-ing">
      <Header
        title="Explore Drinks"
        enableSearchIcon={ false }
      />
      <div className="main-container-ing-drinks">
        {ingredients && ingredients.map((ing, index) => (
          <IngredientCard
            key={ index }
            ingredient={ ing }
            type="bebidas"
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
