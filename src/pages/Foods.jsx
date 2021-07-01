import React, { useContext } from 'react';
import Header from '../components/Header';
import MealCard from '../components/MealCard';
import SearchContext from '../context/SearchContext';
import Footer from '../components/Footer';

function Foods() {
  const { filteredRecipes } = useContext(SearchContext);
  const CARDS_NUMBER = 11;
  return (
    <div>
      <Header title="Comidas" searchImg="true" />
      {filteredRecipes ? filteredRecipes.map((recipes, index) => (
        index <= CARDS_NUMBER ? (
          <MealCard
            key={ recipes.idMeal }
            mealName={ recipes.strMeal }
            mealImg={ recipes.strMealThumb }
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

export default Foods;
