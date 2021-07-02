import React from 'react';
import Header from '../Components/Header';
import SearchBarBtn from '../Components/SearchBarBtn';
import MenuInferior from '../components/MenuInferior';

function Comidas() {
  return (
    <div>
      <Header title="Comidas" />
      <SearchBarBtn />
        <MenuInferior />
     </div>
  );
}

export default Comidas;
