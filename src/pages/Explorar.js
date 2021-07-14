import React from 'react';
import { Redirect } from 'react-router-dom';
import { useClassState } from 'easy-redux-trybe';
import Footer from '../components/Footer';
import Header from '../components/Header';

import styles from '../styles/Profile.module.scss';

function Explorar() {
  const [state, setState] = useClassState({ redirectTo: false });

  return (
    <div>
      { state.redirectTo && <Redirect to={ state.redirectTo } /> }
      <Header title="Explorar" />
      <div className={ styles.container }>
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => setState({
            redirectTo: '/explorar/comidas',
          }) }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => setState({
            redirectTo: '/explorar/bebidas',
          }) }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explorar;
