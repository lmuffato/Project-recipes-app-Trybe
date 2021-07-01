import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideInput: true,
    };

    this.renderInputSearch = this.renderInputSearch.bind(this);
    this.renderSearchButton = this.renderSearchButton.bind(this);
  }

  renderSearchButton() {
    const { location: { pathname } } = this.props;
    if (pathname === '/comidas' || '/bebidas') {
      return (
        <button
          type="submit"
          data-testid="search-top-btn"
          onClick={ () => (
            this.setState((prev) => ({ hideInput: !prev.hideInput }))) }
        >
          <img src={ search } alt="explore" />
        </button>
      );
    }
  }

  renderInputSearch() {
    return (

      <input type="text" />
    );
  }

  render() {
    const { title } = this.props;
    const { hideInput } = this.state;

    return (
      <>
        <header>
          <Link to="/perfil">
            <button type="submit" data-testid="profile-top-btn">
              <img src={ profile } alt="explore" />
            </button>
          </Link>
          <h1 data-testid="page-title">{title}</h1>
          <button
            type="submit"
            data-testid="search-top-btn"
            onClick={ () => (
              this.setState((prev) => ({ hideInput: !prev.hideInput }))) }
          >
            <img src={ search } alt="explore" />
          </button>
        </header>
        {!hideInput && this.renderInputSearch()}
      </>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
