import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FoodContext } from '../Context/FoodProvider';
import Ingredients from '../Components/Ingredients';
import DetailsButtons from '../Components/DetailsButtons';
import FinishBtn from '../Components/FinishBtn';
import PhotoOfProduct from '../Components/PhotoOfProduct';
import TitleOfProduct from '../Components/TitleOfProduct';
import CategoryOfProduct from '../Components/CategoryOfProduct';

const ProgressPage = () => {
  const { currentProduct } = useContext(FoodContext);
  const location = useLocation();
  const page = location.pathname.split('/')[1];
  const [idn] = React
    .useState(page === 'comidas' ? ['meals', 'Meal'] : ['drinks', 'Drink']);

  return (
    <>
      <PhotoOfProduct idn={ idn } />
      <TitleOfProduct idn={ idn } />
      <CategoryOfProduct idn={ idn } />
      <Ingredients currentProduct={ currentProduct } page={ page } />
      <p data-testid="instructions">teste</p>
      <DetailsButtons product={ currentProduct } idn={ idn } />
      <FinishBtn />
    </>
  );
};

export default ProgressPage;
