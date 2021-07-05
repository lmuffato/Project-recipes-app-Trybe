import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';

function Drinks() {
  const [searchButton, setSearchButton] = useState(false);

  const handleClickSearchButton = () => {
    setSearchButton(!searchButton);
  };

  return (
    <div>
      <p>Esta é a pagina de bebidas.</p>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ handleClickSearchButton }
      >
        Search
      </button>
      {searchButton ? <SearchBar /> : null}
    </div>
  );
}

export default Drinks;
