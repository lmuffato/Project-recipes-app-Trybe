import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  } = useContext(Context);

  const location = useLocation();

  const withLocation = async () => {
    const { state: { setIngred, name } } = location;
    const data = setIngred ? await getMealsByIngredient(name)
      : await getMealsDefault();
    return data;
  };

  useEffect(() => {
    const reciveMeals = async () => {
      const { state } = location;
      setLoading(true);
      const data = state ? await withLocation()
        : await getMealsDefault();
      const categoList = await getMealsCat();
      setCategory('All');
      setMealsList([...data]);
      setCatList([...categoList]);
      setLoading(false);
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
