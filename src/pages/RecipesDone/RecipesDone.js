import React from 'react';
import Header from '../../components/Header';
import ButtonFilter from './ButtonsFilter';
// import Footer from '../../components/Footer';
import Recipes from './Recipes';
import './index.css';

const RecipesDone = () => (
  <>
    <Header />
    <ButtonFilter />
    <Recipes />
  </>
);

export default RecipesDone;
