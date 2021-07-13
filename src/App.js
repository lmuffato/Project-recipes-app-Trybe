import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import DetalhesComidas from './pages/DetalhesComidas';
import DetalhesBebidas from './pages/DetalhesBebidas';
import DetalhesComidasIP from './pages/DetalhesComidasIP';
import DetalhesBebidasIP from './pages/DetalhesBebidasIP';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidasIng from './pages/ExplorarComidasIng';
import ExplorarBebidasIng from './pages/ExplorarBebidasIng';
import ExplorarComidasArea from './pages/ExplorarComidasArea';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';

import FoodProvider from './contexts/FoodProvider';
import DrinkProvider from './contexts/DrinkProvider';
import FavoritesProvider from './contexts/FavoritesProvider';
import NotFound from './pages/NotFound';

function App() {
  return (
    <FoodProvider>
      <DrinkProvider>
        <FavoritesProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Comidas } />
            <Route exact path="/bebidas" component={ Bebidas } />
            <Route exact path="/explorar" component={ Explorar } />
            <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
            <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ ExplorarComidasIng }
            />
            <Route
              exact
              path="/explorar/comidas/area"
              component={ ExplorarComidasArea }
            />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ ExplorarBebidasIng }
            />
            <Route exact path="/perfil" component={ Perfil } />
            <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
            <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
            <Route exact path="/comidas/:id" component={ DetalhesComidas } />
            <Route exact path="/bebidas/:id" component={ DetalhesBebidas } />
            <Route
              exact
              path="/comidas/:id/in-progress"
              component={ DetalhesComidasIP }
            />
            <Route
              exact
              path="/bebidas/:id/in-progress"
              component={ DetalhesBebidasIP }
            />
            <Route
              path="*"
              component={ NotFound }
            />
          </Switch>
        </FavoritesProvider>
      </DrinkProvider>
    </FoodProvider>
  );
}

export default App;
