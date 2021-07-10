import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinkIngredients } from '../services/getApis';
import IngredientsCard from '../components/IngredientsCard';

function SearchDrinksIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const MAX_LENGTH = 12;
  useEffect(() => {
    const getIngredients = async () => {
      const result = await fetchDrinkIngredients();
      setIngredientsList(result.drinks);
    };
    getIngredients();
  }, []);
  const URL = 'https://www.thecocktaildb.com/images/ingredients/';
  return (
    <div>
      Pagina SearchDrinksIngredients
      <Header title="Explorar Ingredientes" />
      {ingredientsList.map((ingredient, index) => (
        index < MAX_LENGTH ? (
          <IngredientsCard
            key={ index }
            index={ index }
            ingredientImg={ `${URL}${ingredient.strIngredient1}-Small.png` }
            ingredientName={ ingredient.strIngredient1 }
          />
        ) : (null)
      ))}
      <Footer />
    </div>
  );
}

export default SearchDrinksIngredients;
