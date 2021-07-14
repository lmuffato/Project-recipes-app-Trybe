import { useClassState } from 'easy-redux-trybe';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import styles from '../../styles/Profile.module.scss';

function ExploreFood() {
  const [state, setState] = useClassState({ redirectTo: false });

  const fetchRandom = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const { meals: [{ idMeal }] } = await response.json();
    return idMeal;
  };

  return (
    <div>
      { state.redirectTo && <Redirect to={ state.redirectTo } /> }
      <Header title="Explorar Comidas" />
      <div className={ styles.container }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => setState({
            redirectTo: '/explorar/comidas/ingredientes',
          }) }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => setState({
            redirectTo: '/explorar/comidas/area',
          }) }
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ async () => setState({
            redirectTo: `/comidas/${await fetchRandom()}`,
          }) }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFood;
