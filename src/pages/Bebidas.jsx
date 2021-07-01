import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

class Bebidas extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        Página principal receitas BEBIDAS
        <Footer history={ history } />
      </div>
    );
  }
}

Bebidas.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Bebidas;
