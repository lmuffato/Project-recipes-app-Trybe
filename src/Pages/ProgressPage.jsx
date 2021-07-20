import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DetailsButtons from '../Components/DetailsButtons';
import Ingredients from '../Components/Ingredients';
import FinishBtn from '../Components/FinishBtn';
import PhotoOfProduct from '../Components/PhotoOfProduct';
import TitleOfProduct from '../Components/TitleOfProduct';
import CategoryOfProduct from '../Components/CategoryOfProduct';
import { FoodContext } from '../Context/FoodProvider';

function ProgressPage() {
  const [product, setProduct] = useState({});
  const [idn, setIdn] = useState([]);
  const [isProduct, setIsProduct] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const page = location.pathname.split('/');
  const { setCurrentProduct, checksDone } = useContext(FoodContext);

  useEffect(() => {
    const getProduct = async () => {
      let pageName = '';
      let identifier = [];
      if (page[1] === 'bebidas') {
        pageName = 'thecocktaildb';
        identifier = ['drinks', 'Drink'];
        setIdn(identifier);
      } else if (page[1] === 'comidas') {
        pageName = 'themealdb';
        identifier = ['meals', 'Meal'];
        setIdn(identifier);
      }
      const endpoint = `https://www.${pageName}.com/api/json/v1/1/lookup.php?i=${id}`;
      const result = await fetch(endpoint).then((data) => data.json());
      setProduct(result[identifier[0]]);
      setIsProduct(true);
      setCurrentProduct(result[identifier[0]]);
    };
    getProduct();
  }, []);

  if (isProduct) {
    return (
      <>
        <PhotoOfProduct idn={ idn } currentProduct={ product } id={ id } />
        <TitleOfProduct idn={ idn } currentProduct={ product } id={ id } />
        <CategoryOfProduct idn={ idn } currentProduct={ product } />
        <p data-testid="instructions">{ product[0].strInstructions}</p>
        <Ingredients currentProduct={ product } page={ page[1] } />
        <DetailsButtons product={ product } idn={ idn } />
        <FinishBtn checksDone={ checksDone } currentProduct={ product } idn={ idn } />
      </>
    );
  }
  return (<p>Loading</p>);
}

export default ProgressPage;
