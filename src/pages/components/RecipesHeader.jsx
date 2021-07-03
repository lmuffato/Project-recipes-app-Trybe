import React from 'react';
import { string } from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function RecipesHeader(props) {
  const { type } = props;
  return (
    <header>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile icon" />
      <h3 data-testid="page-title">{ type === 'meals' ? 'Comidas' : 'Bebidas' }</h3>
      <img data-testid="search-top-btn" src={ searchIcon } alt="Search icon" />
    </header>
  );
}

RecipesHeader.propTypes = {
  type: string,
}.isRequired;

export default RecipesHeader;
