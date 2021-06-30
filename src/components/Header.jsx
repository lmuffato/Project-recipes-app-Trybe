import React from 'react';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';

class Header extends React.Component {
  render() {
    const { pageTitle } = this.props;
    return (
      <header>
        <button type="submit" data-testid="profile-top-btn">
          <img src={ profile } alt="explore" />
        </button>
        <h1 data-testid="page-title">{pageTitle}</h1>
        <button type="submit" data-testid="search-top-btn">
          <img src={ search } alt="explore" />
        </button>
      </header>
    );
  }
}

export default Header;
