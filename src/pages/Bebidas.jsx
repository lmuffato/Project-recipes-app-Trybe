import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';

class Bebidas extends React.Component {
  render() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    return (
      <>
        <Header title="Bebidas">
          <SearchButton pathname={ pathname } />
        </Header>
        <div>Página principal receitas BEBIDAS</div>
      </>
    );
  }
}

Bebidas.propTypes = {
  pathname: PropTypes.string,
}.isRequired;

export default Bebidas;
