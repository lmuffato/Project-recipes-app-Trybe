import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

class Explorar extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1>EXPLORAR</h1>
        <button type="submit"> explorar comidas</button>
        <button type="submit"> explorar bebidas </button>
        <Footer history={ history } />
      </div>
    );
  }
}

Explorar.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Explorar;
