import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IngredientCards from './components/IngredientCards';
import { fetchApiIngredientsDrink } from '../../services/fetchApi';

function ExploreDrinksByIngredients() {
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  console.log(drinkIngredients);

  useEffect(() => {
    fetchApiIngredientsDrink().then((res) => setDrinkIngredients(res));
  }, []);

  const lengthIngredients = 12;
  const twelveIngredients = drinkIngredients.slice(0, lengthIngredients);
  return (
    <div>
      <Header />
      { twelveIngredients
        .map((drink, index) => (<IngredientCards
          datatestid={ `${index}-ingredient-card` }
          key={ index }
          name={ drink.strIngredient1 }
          thumbnail={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
          index={ index }
          datatestidCardImg={ `${index}-card-img` }
          datatestidCard={ `${index}-card-name` }
        />))}
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredients;
