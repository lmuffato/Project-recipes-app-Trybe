import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IngredientCards from './components/IngredientCards';
import { fetchApiIngredientsFood } from '../../services/fetchApi';

function ExploreFoodByIngredients() {
  const [foodIngredients, setFoodIngredients] = useState([]);

  useEffect(() => {
    fetchApiIngredientsFood().then((res) => setFoodIngredients(res));
  }, []);
  const lengthIngredients = 12;
  const twelveIngredients = foodIngredients.slice(0, lengthIngredients);
  return (
    <div>
      <Header />
      <div className="fake-cards">
        { twelveIngredients
          .map((meal, index) => (<IngredientCards
            key={ index }
            name={ meal.strIngredient }
            thumbnail={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
            index={ index }
            param="/comidas"
          />))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodByIngredients;
