import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import Footer from '../../components/footer';

function Explore() {
  return (
    <div className={ styles.explorePage }>
      <div className={ styles.exploreContent }>
        <Link to="/explorar/comidas" className="first">
          <button
            id={ styles.first }
            data-testid="explore-food"
            type="button"
            className="primary-btn"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
            className="primary-btn"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
