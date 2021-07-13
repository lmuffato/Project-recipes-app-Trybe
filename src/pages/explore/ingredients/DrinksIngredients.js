import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import BottomMenu from '../../../components/bottomMenu';
import IngredientList from '../../../components/IngredientList';
import { getDrinkIngredients } from '../../../services/getIngredients';

export default function DrinksIngredients() {
  const [ingredList, setList] = useState([]);
  useEffect(() => {
    const getIng = async () => {
      const data = await getDrinkIngredients();
      setList(data);
    };
    getIng();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" show={ false } />
      <IngredientList data={ ingredList } path="bebidas" />
      <BottomMenu />
    </div>
  );
}
