import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

import styles from '../styles/Profile.module.scss';

function Explorar() {
  const redirect = (ev) => {
    const { innerHTML } = ev.target;
    if (innerHTML === 'Explorar Comidas') {
      window.location.href = '/explorar/comidas';
    } else {
      window.location.href = '/explorar/bebidas';
    }
  };

  return (
    <div>
      <Header title="Explorar" />
      <div className={ styles.container }>
        <button type="button" data-testid="explore-food" onClick={ (ev) => redirect(ev) }>
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ (ev) => redirect(ev) }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explorar;
