import React from 'react';
import PropTypes from 'prop-types';
import ExploreDrink from '../../Components/ExploreDrink';
import Footer from '../../Components/Footer';

function ExploreDrinkOpt() {
  document.title = 'Explorar Bebidas';
  return (
    <div>
      <ExploreDrink />
      <Footer />
    </div>
  );
}

ExploreDrinkOpt.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default ExploreDrinkOpt;
