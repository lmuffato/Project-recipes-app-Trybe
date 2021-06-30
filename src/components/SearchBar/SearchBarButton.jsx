import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Generics/Button';
import searchIconImg from '../../images/searchIcon.svg';

function SearchBarButton({ onClick }) {
  return (
    <Button onClick={ onClick }>
      <img
        src={ searchIconImg }
        data-testid="search-top-btn"
        alt="Logo da página de perfil"
      />
    </Button>
  );
}

SearchBarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SearchBarButton;
