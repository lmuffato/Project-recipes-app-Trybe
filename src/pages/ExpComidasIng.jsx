import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExpComidasIng extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header title="Explorar Ingredientes" />
        <div>Página de explorar comidas por origem</div>
        <Footer history={ history } />
      </>
    );
  }
}

ExpComidasIng.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExpComidasIng;
