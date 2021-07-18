import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchMealIngredients } from '../services/getApis';
import IngredientsCard from '../components/IngredientsCard';

function SearchMealsIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const MAX_LENGTH = 12;
  useEffect(() => {
    const getIngredients = async () => {
      const result = await fetchMealIngredients();
      setIngredientsList(result.meals);
    };
    getIngredients();
  }, []);
  const URL = 'https://www.themealdb.com/images/ingredients/';
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="itensGroup">
        {ingredientsList.map((ingredient, index) => (
          index < MAX_LENGTH ? (
            <IngredientsCard
              key={ index }
              index={ index }
              ingredientImg={ `${URL}${ingredient.strIngredient}-Small.png` }
              ingredientName={ ingredient.strIngredient }
              type="comidas"
            />
          ) : (null)
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default SearchMealsIngredients;
