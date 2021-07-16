import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import InferiorMenu from '../components/InferiorMenu';
import CocktailsContext from '../context/CocktailsContext';

export default function DrinkByIngredient() {
  const { setCocktails } = useContext(CocktailsContext);
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const drinkResults = async () => {
      const cocktail = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const responseDrinks = await cocktail.json();
      const { drinks } = responseDrinks;
      const indexDrinks = 12;
      const twelveDrinksIngredients = drinks.slice(0, indexDrinks);
      setIngredients(twelveDrinksIngredients);
    };
    drinkResults();
  }, []);

  const fetchingIngredients = async (fingredient) => {
    const choosenDrink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${fingredient}`);
    const responseApi = await choosenDrink.json();
    await setCocktails(responseApi);
    history.push('/bebidas');
  };

  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Explorar Ingredientes</h1>
      </Header>
      <section>
        { ingredients.map((el, index) => (
          <div
            onClick={ () => fetchingIngredients(el.strIngredient1) }
            data-testid={ `${index}-ingredient-card` }
            key={ el.idIngredient1 }
            aria-hidden="true"
          >
            <p data-testid={ `${index}-card-name` }>
              { el.strIngredient1 }
            </p>
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png` }
              alt=""
              data-testid={ `${index}-card-img` }
            />
          </div>
        )) }
      </section>
      <InferiorMenu />
    </div>
  );
}
