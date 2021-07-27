import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ComidasInProgress from '../../components/ComidasInProgress';
import fetchFoodDetails from '../../services/fetchFoodDetails';
import FoodLoader from '../../components/Loader/Food';

function ComidasProgresso() {
  const { id } = useParams();
  const [data, setData] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAPI() {
      const { meals } = await fetchFoodDetails(id);
      setData(meals[0]);
      setLoading(false);
    }
    fetchAPI();
  }, [id]);

  return isLoading ? <FoodLoader /> : <ComidasInProgress data={ data } />;
}

export default ComidasProgresso;
