import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

class ExpBebidas extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header title="Explorar Bebidas" />
        <div>Página explorar Bebidas</div>
        <Footer history={ history } />
      </>
    );
  }
}

ExpBebidas.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExpBebidas;
