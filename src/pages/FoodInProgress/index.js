import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ComidasInProgress from '../../components/ComidasInProgress';
import fetchFoodDetails from '../../services/fetchFoodDetails';

function ComidasProgresso() {
  const { id } = useParams();
  const [data, setData] = useState('');

  useEffect(() => {
    async function fetchAPI() {
      const { meals } = await fetchFoodDetails(id);
      setData(meals[0]);
    }
    fetchAPI();
  }, [id]);

  return data === '' ? <h2>Loading...</h2> : <ComidasInProgress data={ data } />;
}

export default ComidasProgresso;
