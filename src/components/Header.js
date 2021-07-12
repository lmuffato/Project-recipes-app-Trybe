import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIMG from '../images/profileIcon.svg';
import BuscaHeader from './HeaderComponents/BuscaHeader';
import SearchButton from './HeaderComponents/SearchButton';
import '../styles/Header.css';

function Header(props) {
  const { title, displayButton } = props;
  const [input, setInput] = useState(false);
  return (
    <header className="header">
      <div className="header-top">
        <Link to="/perfil">
          <img
            src={ profileIMG }
            data-testid="profile-top-btn"
            alt="profileIMG"
            className="img-header"
          />
        </Link>
        <p data-testid="page-title" className="page-title">
          {title}
        </p>
        {(displayButton !== false)
          ? <SearchButton input={ input } setInput={ setInput } /> : ''}
      </div>
      <div className="header-bottom">
        { input && <BuscaHeader /> }
      </div>
    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
  displayButton: PropTypes.bool.isRequired,
};

export default Header;
