import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BebidasInProgress from '../../components/BebidasInProgress';
import fetchDrinksDetails from '../../services/fetchDrinkDetails';

function BebidasProgresso() {
  const { pathname } = useLocation();
  const [data, setData] = useState({});
  const [show, setShow] = useState(true);
  const minSlice = 9;
  const maxSlice = -12;
  const id = pathname.slice(minSlice, maxSlice);

  useEffect(() => {
    async function fetchAPI() {
      const { drinks } = await fetchDrinksDetails(id);
      setData(drinks[0]);
      setShow(false);
    }
    fetchAPI();
  }, [id]);

  return show ? <h2>Loading...</h2> : <BebidasInProgress data={ data } />;
}

export default BebidasProgresso;
