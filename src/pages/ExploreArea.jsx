import React from 'react';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';

function ExploreOrigin() {
  return (
    <div>
      <Header>
        <h2 data-testid="page-title">Explorar Origem</h2>
        <SearchBar />
      </Header>
    </div>
  );
}

export default ExploreOrigin;
