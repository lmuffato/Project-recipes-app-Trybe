import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ComidasDetails from '../../components/ComidasDetails';
import fetchFoodDetails from '../../services/fetchFoodDetails';
import drinksRecomendation from '../../services/drinksRecomendation';
import FoodLoader from '../../components/Loader/Food';

function FoodsDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [recomendation, setRecomendation] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      await fetchFoodDetails(id).then(({ meals }) => setData(meals[0]));
      await drinksRecomendation().then((recomendations) => {
        setRecomendation(recomendations);
        setLoading(false);
      });
    }
    getData();
  }, [id]);

  return (
    loading
      ? <FoodLoader />
      : <ComidasDetails data={ data } recomendation={ recomendation } />
  );
}

export default FoodsDetails;
