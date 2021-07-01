import React from 'react';
import searchIMG from '../images/searchIcon.svg';

function SearchButton(props) {
  const { input, setInput } = props;
  return (
    <button
      type="button"
      onClick={ () => setInput(!input) }
    >
      <img
        src={ searchIMG }
        data-testid="search-top-btn"
        alt="searchIMG"
      />
    </button>
  );
}

export default SearchButton;
