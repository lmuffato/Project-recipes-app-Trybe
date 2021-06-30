import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Cocktails(props) {
  return (
    <div>
      <Header />
      <SearchBar props={ props } />
      <h1>Recipe APP</h1>
    </div>
  );
}

export default Cocktails;
