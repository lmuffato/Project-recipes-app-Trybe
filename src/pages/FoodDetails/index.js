import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ComidasDetails from '../../components/ComidasDetails';
import fetchFoodDetails from '../../services/fetchFoodDetails';
import drinksRecomendation from '../../services/drinksRecomendation';

function FoodsDetails() {
  const numberSlice = 9;
  const { pathname } = useLocation();
  const idFood = pathname.slice(numberSlice);

  const [data, setData] = useState([]);
  const [recomendation, setRecomendation] = useState();

  useEffect(() => {
    async function getData() {
      const { meals } = await fetchFoodDetails(idFood);
      const recomendations = await drinksRecomendation();
      setRecomendation(recomendations);
      setData(meals);
    }
    getData();
  }, [idFood]);

  return (
    data.length > 0
      ? <ComidasDetails data={ data } recomendation={ recomendation } />
      : <h2>Loading...</h2>
  );
}

export default FoodsDetails;
