<<<<<<< Updated upstream
import React from 'react';

function Header() {
=======
import React, { useContext } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
// import { transitions, position, Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchbarContext from '../contexts/SearchbarContext';
import SearchBar from './SearchBar';

function Header() {
  const { searchBtn, setSearchBtn } = useContext(SearchbarContext);
  // const options = {
  //   position: positions.BOTTOM_CENTER,
  //   timeout: 5000,
  //   offset: '30px',
  //   transition: transitions.SCALE,
  // };

  function getSearchBar() {
    return searchBtn ? setSearchBtn(false) : setSearchBtn(true);
  }

>>>>>>> Stashed changes
  return (
    <header />
  );
}

export default Header;
