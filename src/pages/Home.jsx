import React, { useState } from 'react';
import Header from '../components/Header/Header';
import SearchBarButton from '../components/SearchBar/SearchBarButton';
import SearchBar from '../components/SearchBar/SearchBar';

function Home() {
  const [isActive, setIsActive] = useState(false);

  const handleToggleSearchBar = (ev) => {
    ev.preventDefault();
    setIsActive((prevState) => !prevState);
  };

  return (
    <>
      <Header>
        <h2 data-testid="page-title">Comidas</h2>
        <SearchBarButton onClick={ handleToggleSearchBar } />
      </Header>
      <div>
        { isActive ? (<SearchBar />) : ''}
      </div>
      <div>
        Lista de receitas
      </div>
    </>
  );
}

export default Home;
