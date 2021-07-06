import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explore from './pages/Explore';

function App() {
  return (
    <Switch>
      <Route path="/explorar" component={ Explore } />
    </Switch>
  );
}

export default App;
