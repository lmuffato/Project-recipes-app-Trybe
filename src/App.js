import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import Header from './compenents/Header';
import Footer from './compenents/Footer';
import Login from './pages/Login';
import Perfil from './pages/Perfil';

function App() {
  return (
    <div className="meals">
      <Header />
      <Switch>
        <Route path="/" component={ Login } />
        <Route path="/perfil" component={ Perfil } />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
