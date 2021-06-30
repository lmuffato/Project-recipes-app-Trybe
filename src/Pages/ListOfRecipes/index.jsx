import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header';

function ListOfRecipes({ header }) {
  return (
    <div>
      <Header>{ header }</Header>
      <h1>ListOfRecipes</h1>
    </div>
  );
}

ListOfRecipes.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default ListOfRecipes;
