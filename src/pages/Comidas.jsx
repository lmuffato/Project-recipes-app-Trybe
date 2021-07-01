import React from 'react';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';

class Comidas extends React.Component {
  render() {
    return (
      <>
        <Header title="Comidas">
          <SearchButton />
        </Header>
        <div>Página principal Receitas COMIDA</div>
      </>

    );
  }
}

export default Comidas;
