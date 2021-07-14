import React from 'react';
import { useClassState } from 'easy-redux-trybe';
import { Redirect } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import styles from '../../styles/Profile.module.scss';

function ExploreDrink() {
  const [state, setState] = useClassState({ redirectTo: false });

  const fetchRandom = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const { drinks: [{ idDrink }] } = await response.json();
    return idDrink;
  };

  return (
    <div>
      { state.redirectTo && <Redirect to={ state.redirectTo } /> }
      <Header title="Explorar Bebidas" />
      <div className={ styles.container }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => setState({
            redirectTo: '/explorar/bebidas/ingredientes',
          }) }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ async () => setState({
            redirectTo: `/bebidas/${await fetchRandom()}`,
          }) }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrink;
