import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExploreButton from '../components/ExploreButton';

class ExpComidas extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header title="Explorar Comidas" />
        <ExploreButton
          textButton="Por Ingredientes"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
          datatestId="explore-by-ingredient"
        />
        <ExploreButton
          textButton="Por Local de Origem"
          onClick={ () => history.push('/explorar/comidas/area') }
          datatestId="explore-by-area"
        />
        <ExploreButton
          textButton="Me Surpreenda!"
          onClick={ () => history.push('/explorar/comidas/area') }
          datatestId="explore-surprise"
        />
        <Footer history={ history } />
      </>
    );
  }
}

ExpComidas.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExpComidas;
