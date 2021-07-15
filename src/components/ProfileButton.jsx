import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImg from '../images/profileIcon.svg';

export default function ProfileButton() {
  return (
    <Link to="/perfil">
      <button
        className="iconButtons"
        type="button"
        data-testid="profile-top-btn"
        src={ ProfileImg }
        alt="Profile"
      >
        <img className="iconButtonsImages" src={ ProfileImg } alt="search" />
      </button>
    </Link>
  );
}
