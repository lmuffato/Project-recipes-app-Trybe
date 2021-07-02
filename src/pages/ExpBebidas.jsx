import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExploreButton from '../components/ExploreButton';

class ExpBebidas extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header title="Explorar Bebidas" />
        <ExploreButton
          textButton="Por Ingredientes"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
          datatestId="explore-by-ingredient"
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

ExpBebidas.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExpBebidas;
