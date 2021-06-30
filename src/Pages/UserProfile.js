import React from 'react';
import Header from '../components/Header';

function UserProfile() {
  return (
    <Header props={ { search: false, title: 'Perfil' } } />
  );
}

export default UserProfile;
