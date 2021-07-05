import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import DetailsCard from "../Components/DetailsCard"


function DetailsPage() {
  const [product, setProduct] = useState({});
  const [idn, setIdn] = useState([]);
  const [isProduct, setIsProduct] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const page = location.pathname.split('/');

  useEffect(() => {
    const getProduct = async () => {
      let pageName = '';
      let identifier = []
      if (page[1] === 'bebidas') {
        pageName = 'thecocktaildb';
        identifier = ["drinks", "Drink"];
        setIdn(identifier);
      } else if (page[1] === 'comidas') {
        pageName = 'themealdb';
        identifier = ["meals", "Meal"];
        setIdn(identifier);
      }
      const endpoint = `https://www.${pageName}.com/api/json/v1/1/lookup.php?i=${id}`;
      const result = await fetch(endpoint).then((data) => data.json());
      setProduct(result[identifier[0]]);
      setIsProduct(true)
    }
    getProduct();
  }, []);

  return (
    <>
      <p>Details Page</p>
      {isProduct && <DetailsCard product={ product } idn={ idn } />}
      <span>{ id }</span>
    </>
  );
}

export default DetailsPage;
