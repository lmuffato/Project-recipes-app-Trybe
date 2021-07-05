import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';
import MainDrinkCard from '../components/MainDrinkCard';

class Bebidas extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header title="Bebidas">
          <SearchButton />
        </Header>
        <div>Página principal receitas BEBIDAS</div>
        <MainDrinkCard />
        <Footer history={ history } />
      </>
    );
  }
}

Bebidas.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Bebidas;
