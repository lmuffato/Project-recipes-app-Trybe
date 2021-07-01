import React, { useContext } from 'react';
import Header from '../components/Header';
import DrinkCard from '../components/DrinkCard';
import SearchContext from '../context/SearchContext';

function Drinks() {
  const { filteredDrinks } = useContext(SearchContext);
  const CARDS_NUMBER = 11;
  return (
    <div>
      Pagina Drinks
      <Header title="Bebidas" searchImg="true" />
      {filteredDrinks.map((recipes, index) => (
        index <= CARDS_NUMBER ? (
          <DrinkCard
            key={ recipes.idDrink }
            mealName={ recipes.strDrink }
            mealImg={ recipes.strDrinkThumb }
            testImgId={ `${index}-card-img` }
            testNameId={ `${index}-card-name` }
            testCardId={ `${index}-recipe-card` }
          />
        ) : null
      ))}
    </div>
  );
}

export default Drinks;
