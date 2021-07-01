import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Perfil';
import Explorar from './pages/Explorar';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ExpBebidas from './pages/ExpBebidas';
import ExpComidas from './pages/ExpComidas';
import ExpBebidasIng from './pages/ExpBebidasIng';
import ExpComidasIng from './pages/ExpComidasIng';
import ExpComidasOri from './pages/ExpComidasOri';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Comidas } />
            <Route exact path="/bebidas" component={ Bebidas } />
            <Route exact path="/perfil" component={ Profile } />
            <Route exact path="/explorar" component={ Explorar } />

            <Route exact path="/explorar/bebidas" component={ ExpBebidas } />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ ExpBebidasIng }
            />
            <Route exact path="/explorar/comidas" component={ ExpComidas } />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ ExpComidasIng }
            />
            <Route exact path="/explorar/comidas/area" component={ ExpComidasOri } />

            <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
            <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
