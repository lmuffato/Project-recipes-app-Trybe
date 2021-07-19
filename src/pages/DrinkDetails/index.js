import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BebidasDetails from '../../components/BebidasDetails';
import fetchDrinkDetails from '../../services/fetchDrinkDetails';
import foodsRecomendation from '../../services/foodsRecomendation';

function DrinkDetails() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [recomendation, setRecomendation] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const { drinks } = await fetchDrinkDetails(id);
      const recomendations = await foodsRecomendation();
      setRecomendation(recomendations);
      setData([...drinks]);
      setLoading(false);
    }
    getData();
  }, [id]);

  return (
    loading || data === undefined
      ? <h2>Loading...</h2>
      : <BebidasDetails data={ data } recomendation={ recomendation } />);
}

export default DrinkDetails;
