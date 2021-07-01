import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import DrinkCard from '../components/DrinkCard';
import SearchContext from '../context/SearchContext';
import Footer from '../components/Footer';

function Drinks() {
  const { filteredDrinks, getFullDrinksRecipes, fullDrinks } = useContext(SearchContext);
  const CARDS_NUMBER = 11;

  const [showRecipe, setShowRecipe] = useState([]);
  useEffect(() => {
    getFullDrinksRecipes();
  }, []);

  useEffect(() => {
    if (!filteredDrinks || filteredDrinks.length > 0) {
      setShowRecipe(filteredDrinks);
    } else { setShowRecipe(fullDrinks); }
  }, [fullDrinks, filteredDrinks]);

  return (
    <div>
      Pagina Drinks
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
