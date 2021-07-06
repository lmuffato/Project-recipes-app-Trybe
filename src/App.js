import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';

import 'bootstrap/dist/css/bootstrap.min.css';
import Favotire from './pages/Favotire';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Meals } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/receitas-favoritas" component={ Favotire } />
      </Switch>
    </div>
  );
}
export default App;
