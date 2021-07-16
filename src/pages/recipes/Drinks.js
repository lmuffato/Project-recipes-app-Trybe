import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';
import RecipesList from '../../components/RecipesList';
import ButtomFilters from '../../components/ButtomFilters';
import Context from '../../context/Context';
import { getDrinks, getDrinkByIngredient } from '../../services/getDrinks';
import getDrinksCat from '../../services/getDrinksCat';
import '../../App.css';

export default function Drinks() {
  const { drinksList, setDrinksList, isLoading,
    setLoading, setCatList, catList, setCategory,
  } = useContext(Context);

  const location = useLocation();

  const withLocation = async () => {
    const { state: { setIngred, name } } = location;
    const data = setIngred ? await getDrinkByIngredient(name)
      : await getDrinks();
    return data;
  };

  useEffect(() => {
    const reciveDrinks = async () => {
      const { state } = location;
      setLoading(true);
      const data = state ? await withLocation()
        : await getDrinks();
      const categoList = await getDrinksCat();
      setCategory('All');
      setDrinksList([...data]);
      setCatList([...categoList]);
      setLoading(false);
    };
    reciveDrinks();
  }, []);

  return (
    <div className="food-page">
      <Header title="Bebidas" show />
      <ButtomFilters data={ catList } path="" />
      { isLoading ? <h1>Loading...</h1>
        : <RecipesList data={ drinksList } path="bebidas" /> }
      <BottomMenu />
    </div>
  );
}
