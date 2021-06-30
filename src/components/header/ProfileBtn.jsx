import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../../images/profileIcon.svg';

export default function ProfileBtn() {
  return (
    <div data-testid="profile-top-btn">
      <Link to="/profile">
        <img src={ ProfileIcon } alt="Profile icon" />
      </Link>
    </div>
  );
}
