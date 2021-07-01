import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
// import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import './App.css';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Explorar from './pages/Explorar';
import Perfil from './pages/Perfil';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas/:id" component={ Bebidas } />
        <Route exact path="/comidas/:id" component={ Comidas } />
        <Route exact path="/bebidas/:id/in-progress" component={ Bebidas } />
        <Route exact path="/comidas/:id/in-progress" component={ Comidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/bebidas" component={ Login } />
        <Route exact path="/explorar/comidas" component={ Login } />
        <Route exact path="/explorar/bebidas/ingredientes" component={ Login } />
        <Route exact path="/explorar/comidas/ingredientes" component={ Login } />
        {/* <Route exact path="/explorar/bebidas/area" component={ Login } /> */}
        <Route exact path="/explorar/comidas/area" component={ Login } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ Login } />
        <Route exact path="/receitas-favoritas" component={ Login } />
        {/* <Route exact path="/feedback" component={ Feedback } /> */}
        <Route path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
// import React from 'react';
// import './App.css';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <div className="meals">
//       <span className="logo">TRYBE</span>
//       <object
//         className="rocksGlass"
//         type="image/svg+xml"
//         data={ rockGlass }
//       >
//         Glass
//       </object>
//     </div>
//   );
// }

// export default App;
