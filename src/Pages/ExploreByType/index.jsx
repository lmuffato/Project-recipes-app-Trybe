import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

function ExploreByType({ header }) {
  return (
    <div>
      <Header>{ header }</Header>
      <h1>ExploreByType</h1>
      <Footer />
    </div>
  );
}

ExploreByType.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default ExploreByType;
