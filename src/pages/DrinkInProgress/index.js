import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BebidasInProgress from '../../components/BebidasInProgress';
import fetchDrinksDetails from '../../services/fetchDrinkDetails';
import DrinkLoader from '../../components/Loader/Drink';

function BebidasProgresso() {
  const { id } = useParams();
  const [data, setData] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAPI() {
      const { drinks } = await fetchDrinksDetails(id);
      setData(drinks[0]);
      setLoading(false);
    }
    fetchAPI();
  }, [id]);

  return isLoading ? <DrinkLoader /> : <BebidasInProgress data={ data } />;
}

export default BebidasProgresso;
