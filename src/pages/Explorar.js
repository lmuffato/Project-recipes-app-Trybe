import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <section>
      <Header title="Explorar" show={ false } />
      Página de Explorar
      <footer>
        <Footer />
      </footer>
    </section>);
}

export default Explorar;
