import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BebidasDetails from '../../components/BebidasDetails';
import fetchDrinksDetails from '../../services/fetchDrinkDetails';
import foodsRecomendation from '../../services/foodsRecomendation';
import DrinkLoader from '../../components/Loader/Drink';

function DrinkDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [recomendation, setRecomendation] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      await fetchDrinksDetails(id).then(({ drinks }) => setData(drinks[0]));
      await foodsRecomendation().then((recomendations) => {
        setRecomendation(recomendations);
        setLoading(false);
      });
    }
    getData();
  }, [id]);

  return (
    loading
      ? <DrinkLoader />
      : <BebidasDetails data={ data } recomendation={ recomendation } />);
}

export default DrinkDetails;
