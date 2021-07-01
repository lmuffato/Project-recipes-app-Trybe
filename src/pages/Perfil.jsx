import React from 'react';
import Header from '../components/Header';

class Perfil extends React.Component {
  render() {
    return (
      <div>
        <Header title="Perfil" />
        <span> email usuário from store</span>
        <button type="submit">FEITAS</button>
        <button type="submit">FAVORITAS</button>
        <button type="submit">SAIR</button>
      </div>
    );
  }
}

export default Perfil;
