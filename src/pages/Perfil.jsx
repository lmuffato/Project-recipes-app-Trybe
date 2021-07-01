import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

class Perfil extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <span> email usuário from store</span>
        <button type="submit">FEITAS</button>
        <button type="submit">FAVORITAS</button>
        <button type="submit">SAIR</button>
        <Footer history={ history } />
      </div>
    );
  }
}

Perfil.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Perfil;
