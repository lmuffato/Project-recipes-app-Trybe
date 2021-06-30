import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import UserProvider from './context/UserProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Main from './pages/Main';
import Cocktails from './pages/Cocktails';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <UserProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/comidas" component={ Main } />
            <Route path="/bebidas" component={ Cocktails } />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
