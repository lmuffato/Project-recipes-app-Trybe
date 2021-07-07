import React, { useContext } from 'react';
import context from '../../../store/Context';
import { Header, Footer, IngredientsDrinkCard } from '../../../components';

function ExploreDrinksIngredients() {
  const { drinksIngredients } = useContext(context);

  return (
    <>
      <Header title="Explorar Ingredientes" searchBtn={ false } />
      <div>
        {
          drinksIngredients.map((ingredient, index) => (
            <IngredientsDrinkCard
              key={ index }
              drinksIngredients={ ingredient }
              index={ index }
              id={ ingredient.idIngredient }
            />
          ))
        }
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrinksIngredients;
