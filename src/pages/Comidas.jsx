import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';

class Comidas extends React.Component {
  render() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    return (
      <>
        <Header title="Comidas">
          <SearchButton pathname={ pathname } />
        </Header>
        <div>Página principal Receitas COMIDA</div>
      </>

    );
  }
}

Comidas.propTypes = {
  pathname: PropTypes.string,
}.isRequired;

export default Comidas;
