import React from 'react';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';

class ExpComidasOri extends React.Component {
  render() {
    return (
      <>
        <Header title="Explorar Origem">
          <SearchButton />
        </Header>
        <div>Página de explorar Comidas por origem</div>
      </>

    );
  }
}

export default ExpComidasOri;
