import React, { useContext } from 'react';
import context from '../../../store/Context';
import { Header, Footer, IngredientsFoodCard } from '../../../components';

function ExploreFoodIngredients() {
  const { foodsIngredients } = useContext(context);

  return (
    <>
      <Header title="Explorar Ingredientes" searchBtn={ false } />
      <div>
        {
          foodsIngredients.map((ingredient, index) => (
            <IngredientsFoodCard
              key={ index }
              foodsIngredients={ ingredient }
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

export default ExploreFoodIngredients;
