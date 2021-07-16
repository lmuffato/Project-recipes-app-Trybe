import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/ExplorarBebidasIng.css';

export default function ExplorarBebidasIng() {
  return (
    <div className="explorar-bebidas-ing">
      <Header
        title="Explorar Ingredientes"
        enableSearchIcon={ false }
      />
      <Footer />
    </div>
  );
}
