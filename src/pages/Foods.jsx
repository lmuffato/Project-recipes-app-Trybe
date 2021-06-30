import React from 'react';
import Footer from '../components/Footer';

import Header from '../components/Header';

export default function Foods() {
  return (
    <div>
      <Header title="Comidas" searchIcon>
        <h1>Foods!</h1>
      </Header>
      <Footer />
    </div>
  );
}
