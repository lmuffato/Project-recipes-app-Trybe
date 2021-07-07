import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';
import RecipesList from '../../components/RecipesList';
import { getDrinksDefault } from '../../services/getDrinks';
import Context from '../../context/Context';

export default function Foods() {
  const { drinkList, setDrinkList, isLoading, setLoading } = useContext(Context);
  useEffect(() => {
    const reciveDrinks = async () => {
      setLoading(true);
      const data = await getDrinksDefault();
      setDrinkList(data);
      setLoading(false);
    };
    reciveDrinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="food-page">
      <Header title="Bebidas" show />
      { isLoading ? <h1>Loading...</h1> : <RecipesList data={ drinkList } /> }
      <BottomMenu />
    </div>
  );
}
