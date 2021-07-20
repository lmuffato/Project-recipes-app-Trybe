import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BebidasInProgress from '../../components/BebidasInProgress';
import fetchDrinksDetails from '../../services/fetchDrinkDetails';

function BebidasProgresso() {
  const { id } = useParams();
  const [data, setData] = useState('');
  // const [show, setShow] = useState(true);

  useEffect(() => {
    async function fetchAPI() {
      const { drinks } = await fetchDrinksDetails(id);
      setData(drinks[0]);
      // setShow(false);
    }
    fetchAPI();
  }, [id]);

  return data === '' ? <h2>Loading...</h2> : <BebidasInProgress data={ data } />;
}

export default BebidasProgresso;
