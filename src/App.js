import React from 'react';
import Routes from './routes';
import ContextFood from './context/comidaContext/ContextFood';
import ContextDrink from './context/comidaContext/ContextDrink';

function App() {
  return (
    <ContextDrink>
      <ContextFood>
        <Routes />
      </ContextFood>
    </ContextDrink>
  );
}

export default App;
