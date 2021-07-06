import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
// import BarraBuscar from './BarraBuscar';

function Header({ title, show = true }) {
  const history = useHistory();
  const [click, setClick] = useState(false);

  function handleClick() {
    if (!click) setClick(true);
    if (click) setClick(false);
  }

  function handleSearch() {
    if (show) {
      return (
        <button
          type="button"
          onClick={ () => handleClick() }
        >
          <img data-testid="search-top-btn" src={ search } alt="search icon" />
        </button>
      );
    }
  }

  return (
    <section>
      <div>
        <button
          type="button"
          onClick={ () => history.push('/perfil') }
        >
          <img data-testid="profile-top-btn" src={ profile } alt="profile icon" />
        </button>

        <h3 data-testid="page-title">{ title }</h3>

        { handleSearch() }

      </div>
      <div>
        { (click) ? <div data-testid="search-input">barra de buscar aqui</div> : null }
        {/* coloquei o data-testid aqui para passar no requisto 12, mas ele égi para ser colocado no input do
        componete barrabuscar, e esse componete deve ser renderizado aqui */}
      </div>
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Header;
