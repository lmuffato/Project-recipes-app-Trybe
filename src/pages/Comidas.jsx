import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';

class Comidas extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header title="Comidas">
          <SearchButton />
        </Header>
        <div>Página principal Receitas COMIDA</div>
        <Footer history={ history } />
      </>
    );
  }
}

Comidas.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Comidas;
