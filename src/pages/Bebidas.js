import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Bebidas() {
  const id = '15328';
  return (
    <div>
      <h1>Bebidas</h1>
      <Header title="Bebidas" />
      <Link to={ `/bebidas/${id}` }>More details</Link>
      <Footer />
    </div>
  );
}

export default Bebidas;
