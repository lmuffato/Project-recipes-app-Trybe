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
      {displayButton && <SearchButton input={ input } setInput={ setInput } />}
      { input === true && <BuscaHeader /> }
    </div>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
