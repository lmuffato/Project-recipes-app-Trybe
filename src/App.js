import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './compenents/Footer';
import Profile from './pages/ProfilePage';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import UserProvider from './contexts/UserProvider';
import Header from './compenents/Header';
import SearchbarProvider from './contexts/SeachbarProvider';

function App() {
  return (
    <div className="meals">
      <Header />
      <UserProvider>
        <Switch>
          <Route exact path="/" component={ LoginPage } />
          <Route path="/perfil" component={ Profile } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        </Switch>
      </UserProvider>
      <SearchbarProvider>
        <Footer />
      </SearchbarProvider>
    </div>
  );
}

export default App;
