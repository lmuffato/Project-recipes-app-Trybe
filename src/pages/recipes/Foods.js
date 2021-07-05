import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';
import RecipesList from '../../components/RecipesList';
import Context from '../../context/Context';
import getMeals from '../../services/getMeals';
import '../../App.css';

export default function Foods() {
  const { mealsList, setMealsList, isLoading, setLoading } = useContext(Context);

  useEffect(() => {
    const reciveMeals = async () => {
      setLoading(true);
      const data = await getMeals();
      setMealsList([...data]);
      setLoading(false);
    };
    reciveMeals();
  }, []);

  return (
    <div className="food-page">
      <Header title="Comidas" show />
      { isLoading ? <h1>Loading...</h1>
        : <RecipesList data={ mealsList } path="comidas" /> }
      <BottomMenu />
    </div>
  );
}
