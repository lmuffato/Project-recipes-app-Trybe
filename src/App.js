import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './compenents/Footer';
// import MainRecepies from './compenents/MainRecepies';
import SearchbarProvider from './contexts/SeachbarProvider';
import UserProvider from './contexts/UserProvider';
import Explore from './pages/Explore';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';

function App() {
  return (
    <div className="meals">
      <UserProvider>
        <SearchbarProvider>
          <Switch>
            <Route exact path="/" component={ LoginPage } />
            <Route exact path="/explorar" component={ Explore } />
            <Route exact path="/explorar/comidas" component={ Foods } />
            <Route exact path="/explorar/bebidas" component={ Drinks } />
          </Switch>
          <Footer />
        </SearchbarProvider>
      </UserProvider>
    </div>
  );
}

export default App;
