import React, { useState } from 'react';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchBarButton from '../components/SearchBar/SearchBarButton';

function ExploreOrigin() {
  const [isActive, setIsActive] = useState(false);

  const handleToggleSearchBar = (ev) => {
    ev.preventDefault();
    setIsActive((prevState) => !prevState);
  };

  return (
    <div>
      <Header heading="Explorar Origem">
        <SearchBarButton onClick={ handleToggleSearchBar } />
      </Header>
      { isActive ? (<SearchBar />) : ''}
    </div>
  );
}

export default ExploreOrigin;
