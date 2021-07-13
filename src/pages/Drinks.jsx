import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchContext from '../context/SearchContext';
import DrinkCard from '../components/DrinkCard';
import FilterContext from '../context/FilterContext';
import FilterButtons from '../components/FilterButtons';
import ButtonAll from '../components/ButtonAll';
import UserContext from '../context/UserContext';

function Drinks() {
  const { setGlobalRecipe } = useContext(UserContext);
  const { filteredDrinks, fullDrinks } = useContext(SearchContext);
  const { drinksCategories, drinkFilterButton,
    drinksByCategory, setDrinkFilterButton } = useContext(FilterContext);
  const CARDS_NUMBER = 11;
  const CATEGORIES_NUMBER = 5;
  const [showRecipe, setShowRecipe] = useState([]);

  useEffect(() => {
    if (drinkFilterButton !== '') {
      setShowRecipe(drinksByCategory);
    } else if (!filteredDrinks || filteredDrinks.length > 0) {
      setShowRecipe(filteredDrinks);
    } else {
      setShowRecipe(fullDrinks);
    }
  }, [fullDrinks, filteredDrinks, drinksByCategory, drinkFilterButton]);

  useEffect(() => {
    setGlobalRecipe(showRecipe);
  }, [showRecipe]);

  return (
    <div className="mainFoodsAndDrinks">
      <Header title="Bebidas" searchImg="true" />
      <div className="headerFilterButtons">
        {drinksCategories.map((category, index) => (
          index < CATEGORIES_NUMBER ? (
            <FilterButtons
              key={ index }
              categoryName={ category.strCategory }
              testId={ `${category.strCategory}-category-filter` }
            />
          ) : (null)
        ))}
        <ButtonAll setFiltered={ setDrinkFilterButton } />
      </div>
      <div className="itensGroup">
        {showRecipe ? showRecipe.map((recipes, index) => (
          index <= CARDS_NUMBER ? (
            <DrinkCard
              key={ recipes.idDrink }
              mealName={ recipes.strDrink }
              mealImg={ recipes.strDrinkThumb }
              testImgId={ `${index}-card-img` }
              testNameId={ `${index}-card-name` }
              testCardId={ `${index}-recipe-card` }
              mealId={ recipes.idDrink }
            />
          ) : null
        )) : alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
