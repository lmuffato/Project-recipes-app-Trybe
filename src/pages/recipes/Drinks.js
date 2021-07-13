import React, { useContext, useEffect } from 'react';
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
    ingredFromExplore, fromExplore, setFromExplore,
  } = useContext(Context);

  useEffect(() => {
    const reciveDrinks = async () => {
      setLoading(true);
      const data = fromExplore ? await getDrinkByIngredient(ingredFromExplore)
        : await getDrinks();
      const categoList = await getDrinksCat();
      setCategory('All');
      setDrinksList([...data]);
      setCatList([...categoList]);
      setLoading(false);
      setFromExplore(false);
    };
    reciveDrinks();
  }, []);

  return (
    <div className="food-page">
      <Header title="Bebidas" show />
      <ButtomFilters data={ catList } />
      { isLoading ? <h1>Loading...</h1>
        : <RecipesList data={ drinksList } path="bebidas" /> }
      <BottomMenu />
    </div>
  );
}
