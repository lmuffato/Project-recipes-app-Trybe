import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../../images/profileIcon.svg';

export default function ProfileBtn() {
  return (
    <div>
      <Link to="/profile">
        <img src={ ProfileIcon } alt="Profile icon" data-testid="profile-top-btn" />
      </Link>
    </div>
  );
}
