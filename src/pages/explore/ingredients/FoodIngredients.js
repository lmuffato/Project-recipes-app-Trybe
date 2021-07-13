import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import BottomMenu from '../../../components/bottomMenu';
import IngredientList from '../../../components/IngredientList';
import { getFoodIngredients } from '../../../services/getIngredients';

export default function FoodIngredients() {
  const [ingredList, setList] = useState([]);
  useEffect(() => {
    const getIng = async () => {
      const data = await getFoodIngredients();
      setList(data);
    };
    getIng();
  }, []);
  return (
    <div>
      <Header title="Explorar Ingredientes" show={ false } />
      <IngredientList data={ ingredList } />
      <BottomMenu />
    </div>
  );
}
