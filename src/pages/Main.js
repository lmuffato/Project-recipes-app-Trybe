import React from 'react';
import Header from '../components/Header';
import MealsCards from '../components/MealsCards';
import SearchBar from '../components/SearchBar';

function Main(props) {
  return (
    <div>
      <Header />
      <SearchBar props={ props } />
      <h1>Recipe APP</h1>
      <MealsCards />
    </div>
  );
}

export default Main;
