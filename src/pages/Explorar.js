import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

import styles from '../styles/Explore.module.scss';

function Explorar() {
  return (
    <div className={ styles.container }>
      <Header title="Explorar" />
      <button type="button">
        <Link
          to="/explorar/comidas"
          data-testid="explore-food"
          className={ styles.redirect }
        >
          Explorar Comidas
        </Link>
      </button>
      <button type="button">
        <Link
          to="/explorar/bebidas"
          data-testid="explore-drinks"
          className={ styles.redirect }
        >
          Explorar Bebidas
        </Link>
      </button>
      <Footer />
    </div>
  );
}

export default Explorar;
