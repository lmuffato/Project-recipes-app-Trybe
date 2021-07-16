import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/ExplorarComidasIng.css';

export default function ExplorarComidasIng() {
  return (
    <div className="explorar-comidas-ing">
      <Header
        title="Explorar Ingredientes"
        enableSearchIcon={ false }
      />
      <Footer />
    </div>
  );
}
