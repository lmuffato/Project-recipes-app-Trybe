import React from 'react';
import Header from '../components/Header';

class Explorar extends React.Component {
  render() {
    return (
      <>
        <Header title="Explorar" />
        <div>
          <h1>EXPLORAR</h1>
          <button type="submit"> explorar comidas</button>
          <button type="submit"> explorar bebidas </button>
        </div>
      </>
    );
  }
}

export default Explorar;
