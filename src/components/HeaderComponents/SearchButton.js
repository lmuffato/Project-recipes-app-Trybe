import React from 'react';
import PropTypes from 'prop-types';
import searchIMG from '../../images/searchIcon.svg';

function SearchButton(props) {
  const { input, setInput } = props;
  return (
    <button
      type="button"
      onClick={ () => setInput(!input) }
      className="btn-search"
    >
      <img
        src={ searchIMG }
        data-testid="search-top-btn"
        alt="searchIMG"
      />
    </button>
  );
}

SearchButton.propTypes = {
  input: PropTypes.bool.isRequired,
  setInput: PropTypes.func.isRequired,
};

export default SearchButton;
