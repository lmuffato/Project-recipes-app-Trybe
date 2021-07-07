import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProfileBody from './components/ProfilePage/ProfileBody';

function Profile() {
  return (
    <div>
      <Header type="profile" />
      <ProfileBody />
      <Footer />
    </div>
  );
}

export default Profile;
