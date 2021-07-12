import { Link } from 'react-router-dom';
import React from 'react';
import styles from '../../styles.module.scss';

function ExploreButtons({ title }) {
  if (title) {
    return (
      <>
        <Link to={ `/explorar/${title}/ingredientes` }>
          <button
            type="button"
            className="primary-btn"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        {title === 'comidas' && <Link to="/explorar/comidas/area">
          <button
            type="button"
            className="primary-btn"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>}
        <Link to="/comidas">
          <button
            id={ styles.last }
            type="button"
            className="primary-btn"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      </>
    );
  }
  return (
    <>
      <Link to="/explorar/comidas" className="first">
        <button
          data-testid="explore-food"
          type="button"
          className="primary-btn"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          id={ styles.last }
          type="button"
          data-testid="explore-drinks"
          className="primary-btn"
        >
          Explorar Bebidas
        </button>
      </Link>
    </>
  );
}

export default ExploreButtons;
