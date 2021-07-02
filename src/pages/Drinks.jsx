import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchContext from '../context/SearchContext';
import DrinkCard from '../components/DrinkCard';

function Drinks() {
  const { filteredDrinks, fullDrinks } = useContext(SearchContext);
  const CARDS_NUMBER = 11;

  const [showRecipe, setShowRecipe] = useState([]);

  useEffect(() => {
    if (!filteredDrinks || filteredDrinks.length > 0) {
      setShowRecipe(filteredDrinks);
      console.log(filteredDrinks, '!filteredDrinks');
    } else {
      setShowRecipe(fullDrinks);
      console.log(filteredDrinks, 'filteredDrinks');
    }
  }, [fullDrinks, filteredDrinks]);

  // if (isLoading) {
  //   return (
  //     <div>
  //       <Header title="Bebidas" searchImg="true" />
  //       Loading...
  //       <Footer />
  //     </div>
  //   );
  // }
  return (
    <div>
      <Header title="Bebidas" searchImg="true" />
      {showRecipe ? showRecipe.map((recipes, index) => (
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
      )) : alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')}
      <Footer />
    </div>
  );
}

export default Drinks;
