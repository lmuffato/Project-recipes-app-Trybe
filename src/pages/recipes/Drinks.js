import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';
import RecipesList from '../../components/RecipesList';
import Context from '../../context/Context';
import { getDrinks } from '../../services/getDrinks';
import '../../App.css';

export default function Drinks() {
  const { drinksList, setDrinksList, isLoading, setLoading } = useContext(Context);

  useEffect(() => {
    const reciveDrinks = async () => {
      setLoading(true);
      const data = await getDrinks();
      setDrinksList([...data]);
      setLoading(false);
    };
    reciveDrinks();
    console.log(drinksList);
  }, []);

  return (
    <div className="food-page">
      <Header title="Bebidas" show />
      { isLoading ? <h1>Loading...</h1>
        : <RecipesList data={ drinksList } path="bebidas" /> }
      <BottomMenu />
    </div>
  );
}
