import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../images/searchIcon.svg';
import ProfileImage from '../images/profileIcon.svg';

function Header() {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  const searchButton = () => (
    <button
      type="button"
      onClick={ () => setDisplaySearchBar(!displaySearchBar) }
      name="buttonSearch"
    >
      <img
        data-testid="search-top-btn"
        src={ SearchIcon }
        alt="profileIcon"
      />
    </button>
  );

  return (
    <header>
      <div>
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            alt="profileIcon"
            src={ ProfileImage }
          />
        </Link>
        <h1 data-testid="page-title">title</h1>
        <div>
          { searchButton }
        </div>
      </div>
    </header>
  );
}

export default Header;
