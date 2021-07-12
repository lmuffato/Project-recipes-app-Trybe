import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles.module.scss';

import getRecipes from '../../../../services/recipesData';

function ExploreButtons({ title }) {
  const [randomId, setRandomId] = useState('');

  function renderAreaLink() {
    if (title === 'comidas') {
      return (
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            className="primary-btn"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
      );
    }
  }

  async function getRandomId() {
    const { getRandom } = await getRecipes(`/${title}`);
    setRandomId(getRandom[0].id);
  }

  useEffect(() => {
    getRandomId();
  });

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
        {renderAreaLink()}
        <Link to={ `/${title}/${randomId}` }>
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

ExploreButtons.propTypes = {
  title: PropTypes.string,
};

ExploreButtons.defaultProps = {
  title: '',
};

export default ExploreButtons;
