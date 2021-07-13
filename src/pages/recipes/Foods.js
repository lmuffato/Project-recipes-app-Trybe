import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';
import RecipesList from '../../components/RecipesList';
import ButtomFilters from '../../components/ButtomFilters';
import Context from '../../context/Context';
import { getMealsDefault, getMealsByIngredient } from '../../services/getMeals';
import getMealsCat from '../../services/getMealsCat';
import '../../App.css';

export default function Foods() {
  const { mealsList, setMealsList,
    isLoading, setLoading, catList, setCatList, setCategory,
    ingredFromExplore, fromExplore, setFromExplore,
  } = useContext(Context);

  useEffect(() => {
    const reciveMeals = async () => {
      setLoading(true);
      const data = fromExplore ? await getMealsByIngredient(ingredFromExplore)
        : await getMealsDefault();
      const categoList = await getMealsCat();
      setCategory('All');
      setMealsList([...data]);
      setCatList([...categoList]);
      setLoading(false);
      setFromExplore(false);
    };

    reciveMeals();
  }, []);

  return (
    <div className="food-page">
      <Header title="Comidas" show />
      <ButtomFilters data={ catList } path="comidas" />
      { isLoading ? <h1>Loading...</h1>
        : <RecipesList data={ mealsList } path="comidas" /> }
      <BottomMenu />
    </div>
  );
}
