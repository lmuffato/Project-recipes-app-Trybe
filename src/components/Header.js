import React, { useState } from 'react';
import { useHistory } from 'react-router';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
// import BarraBuscar from './BarraBuscar';

function Header() {
  const history = useHistory();
  const [click, setClick] = useState(false);

  function handleClick() {
    if (!click) setClick(true);
    if (click) setClick(false);
  }

  return (
    <section>
      <div>
        <button
          type="button"
          data-testids="profile-top-btn"
          onClick={ () => history.push('/perfil') }
        >
          <img src={ profile } alt="profile icon" />
        </button>

        <p data-testids="search-top-btn">Comidas</p>

        <button
          type="button"
          data-testids="search-top-btn"
          onClick={ () => handleClick() }
        >
          <img src={ search } alt="search icon" />
        </button>
      </div>
      <div>
        { (click) ? <div>barra buscarr aqui</div> : null }
      </div>
    </section>
  );
}

export default Header;
