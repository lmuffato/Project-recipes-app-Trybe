import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function UserProfile() {
  return (
    <>
      <Header props={ { search: false, title: 'Perfil' } } />
      <Footer />
    </>
  );
}

export default UserProfile;
