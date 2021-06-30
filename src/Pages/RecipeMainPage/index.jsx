import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

function RecipeMainPage({ header }) {
  return (
    <div>
      <Header>{ header }</Header>
      <h1>RecipeMainPage</h1>
      <Footer />
    </div>
  );
}

RecipeMainPage.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default RecipeMainPage;
