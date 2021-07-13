import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BebidasDetails from '../../components/BebidasDetails';
import fetchDrinkDetails from '../../services/fetchDrinkDetails';
import foodsRecomendation from '../../services/foodsRecomendation';

function DrinkDetails() {
  const numberSlice = 9;
  const { pathname } = useLocation();
  const idDrink = pathname.slice(numberSlice);

  const [data, setData] = useState([]);
  const [recomendation, setRecomendation] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const { drinks } = await fetchDrinkDetails(idDrink);
      const recomendations = await foodsRecomendation();
      setRecomendation(recomendations);
      setData(drinks);
      setLoading(false);
    }
    getData();
  }, [idDrink]);

  return (
    loading
      ? <h2>Loading...</h2>
      : <BebidasDetails data={ data } recomendation={ recomendation } />);
}

export default DrinkDetails;
