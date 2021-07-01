import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import RecipeCard from '../../Components/RecipeCard';

function RecipeMainPage({ header }) {
  return (
    <div>
      <Header>{ header }</Header>
      <RecipeCard />
      <Footer />
    </div>
  );
}

RecipeMainPage.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default RecipeMainPage;
