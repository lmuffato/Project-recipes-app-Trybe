import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SelectArea from '../components/SelectArea';
import SearchContext from '../context/SearchContext';
import MealCard from '../components/MealCard';
import FilterContext from '../context/FilterContext';
import { fetchMealsByArea } from '../services/getApis';

function MealArea() {
  const { fullRecipes } = useContext(SearchContext);
  const { globalArea } = useContext(FilterContext);
  const [showRecipe, setShowRecipe] = useState([]);

  const LIST_LENGTH = 12;

  useEffect(() => {
    const getMealsByArea = async (area) => {
      const result = await fetchMealsByArea(area);
      setShowRecipe(result.meals);
    };
    if (globalArea !== 'All') {
      getMealsByArea(globalArea);
    }
  }, [globalArea]);

  useEffect(() => {
    if (globalArea === 'All') {
      setShowRecipe(fullRecipes);
    }
  }, [fullRecipes, globalArea]);

  return (
    <div>
      <Header title="Explorar Origem" searchImg="true" />
      <SelectArea />
      <div className="itensGroup">
        {showRecipe.map((recipe, index) => (
          index < LIST_LENGTH ? (
            <MealCard
              key={ index }
              mealName={ recipe.strMeal }
              mealImg={ recipe.strMealThumb }
              testImgId={ `${index}-card-img` }
              testNameId={ `${index}-card-name` }
              testCardId={ `${index}-recipe-card` }
              mealId={ recipe.idMeal }
            />
          ) : (null)
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default MealArea;
