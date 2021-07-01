import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

class ExpComidas extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header title="Explorar Comidas" />
        <div> Pagina de explorar comidas</div>
        <Footer history={ history } />
      </>
    );
  }
}

ExpComidas.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExpComidas;
