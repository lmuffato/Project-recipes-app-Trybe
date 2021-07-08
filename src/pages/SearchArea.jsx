import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AreaCards from './components/Search/AreaCards';

function SearchArea() {
  return (
    <>
      <Header type="search-area" />
      <AreaCards />
      <Footer />
    </>
  );
}

export default SearchArea;
