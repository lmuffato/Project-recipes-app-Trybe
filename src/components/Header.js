import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIMG from '../images/profileIcon.svg';
import searchIMG from '../images/searchIcon.svg';

function Header(props) {
  const { title } = props;
  const [input, setInput] = useState(false);

  function HandleClick() {
    setInput(!input);
  }

  return (
    <div>
      <Link to="/perfil">
        <img
          src={ profileIMG }
          data-testid="profile-top-btn"
          alt="profileIMG"
        />
      </Link>
      <p data-testid="page-title">
        {title}
      </p>
      <button type="button" onClick={ HandleClick }>
        <img
          src={ searchIMG }
          data-testid="search-top-btn"
          alt="searchIMG"
        />
      </button>
      {
        input === true
          ? 'true'
          : 'false'
      }
    </div>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
