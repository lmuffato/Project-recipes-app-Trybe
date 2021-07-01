import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

class Comidas extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        Página principal Receitas COMIDA
        <Footer history={ history } />
      </div>
    );
  }
}

Comidas.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Comidas;
