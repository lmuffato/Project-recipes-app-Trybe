import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';
import MainFoodCard from '../components/MainFoodCard';

class Comidas extends React.Component {
  render() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    return (
      <>
        <Header title="Comidas">
          <SearchButton pathname={ pathname } history={ history } />
        </Header>
        <div>Página principal Receitas COMIDA</div>
        <MainFoodCard history={ history } />
        <Footer history={ history } />
      </>
    );
  }
}

Comidas.propTypes = {
  history: PropTypes.shape(),
  pathname: PropTypes.string,
}.isRequired;

export default Comidas;
