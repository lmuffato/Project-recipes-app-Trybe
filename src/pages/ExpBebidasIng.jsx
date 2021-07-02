import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

class ExpBebidasIng extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header title="Explorar Ingredientes" />
        <div> Pagina explorar bebidas por ingredientes</div>
        <Footer history={ history } />
      </>
    );
  }
}

ExpBebidasIng.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExpBebidasIng;
