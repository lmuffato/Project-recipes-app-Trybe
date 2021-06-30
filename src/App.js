import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );
  }
}

export default App;
