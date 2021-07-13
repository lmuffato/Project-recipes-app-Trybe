import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IngredientCards from './components/IngredientCards';
import { fetchApiIngredientsDrink } from '../../services/fetchApi';

function ExploreDrinksByIngredients() {
  const [drinkIngredients, setDrinkIngredients] = useState([]);

  useEffect(() => {
    fetchApiIngredientsDrink().then((res) => setDrinkIngredients(res));
  }, []);

  const lengthIngredients = 12;
  const twelveIngredients = drinkIngredients.slice(0, lengthIngredients);
  return (
    <div>
      <Header />
      <div className="fake-cards">
        { twelveIngredients
          .map((drink, index) => (<IngredientCards
            key={ index }
            name={ drink.strIngredient1 }
            thumbnail={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
            index={ index }
            param="/bebidas"
          />))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredients;
