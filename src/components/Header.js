import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIMG from '../images/profileIcon.svg';
import BuscaHeader from './BuscaHeader';
import SearchButton from './SearchButton';

function Header(props) {
  const { title, displayButton } = props;
  const [input, setInput] = useState(false);

  return (
    <header>
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
      {(displayButton !== false)
        ? <SearchButton input={ input } setInput={ setInput } /> : ''}
      { input && <BuscaHeader /> }
    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
  displayButton: PropTypes.bool.isRequired,
};

export default Header;
