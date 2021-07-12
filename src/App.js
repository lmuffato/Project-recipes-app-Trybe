import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';

import { RecipeContextProvider } from './store/RecipeContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyle from './styles/globals';

function App() {
  return (
    <RecipeContextProvider>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </RecipeContextProvider>
  );
}

export default App;
