import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import DetailsButtons from '../Components/DetailsButtons';
import DetailsCard from '../Components/DetailsCard';
import RecommendationList from '../Components/RecommendationList';
import { FoodContext } from '../Context/FoodProvider';

function DetailsPage() {
  const [product, setProduct] = useState({});
  const [idn, setIdn] = useState([]);
  const [isProduct, setIsProduct] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const page = location.pathname.split('/');
  const { setCurrentProduct } = useContext(FoodContext);

  const handleClick = () => {
    console.log('teste');
  };

  const btnText = () => {
    const idRecipe = true;
    if (!idRecipe) return 'Continuar Receita';
    return 'Iniciar Receita';
  };

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
      <div className="details-page">
        <p>Details Page</p>
        <DetailsCard product={ product } idn={ idn } />
        <RecommendationList idn={ idn } />
        <DetailsButtons product={ product } idn={ idn } />
        <Link to={ `/${page[1]}/${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="init-recipe-btn"
            onClick={ handleClick }
          >
            { btnText() }
          </button>
        </Link>
      </div>
    );
  }
  return (<p>Loading</p>);
}

export default DetailsPage;
