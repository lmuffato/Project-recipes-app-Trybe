import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './compenents/Footer';
import UserProvider from './contexts/UserProvider';

function App() {
  return (
    <div className="meals">
      <UserProvider>
        <Switch>
          <Route exact path="/" component={ LoginPage } />
        </Switch>
      </UserProvider>
      <Footer />
    </div>
  );
}

export default App;
