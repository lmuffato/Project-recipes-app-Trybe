import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Comidas() {
  const id = '52977';
  return (
    <div>
      <h1>Comidas</h1>
      <Header title="Comidas" />
      <Link to={ `/comidas/${id}` }>More details</Link>
      <Footer />
    </div>
  );
}

export default Comidas;
