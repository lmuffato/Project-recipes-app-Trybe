import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
// import Profile from './pages/Profiles';
// import

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        {/*  <Route exact path="/comidas" component={} />
        <Route exact path="/bebidas" component={} />
        <Route exact path="/perfil" component={} />
        <Route exact path="/explorar" component={} /> */}
      </Switch>
    );
  }
}

export default App;
