import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './compenents/Footer';
import UserProvider from './contexts/UserProvider';
// import SearchBar from './compenents/SearchBar';

function App() {
  return (
    <div className="meals">
      <UserProvider>
        <Switch>
          {/* <Route path="/comidas/:detalhes" component={} /> */}
          <Route exact path="/" component={ LoginPage } />
        </Switch>
        {/* <SearchBar /> */}
      </UserProvider>
      <Footer />
    </div>
  );
}

export default App;
