import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';

import { RecipeContextProvider } from './store/RecipeContext';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <RecipeContextProvider>
        <Routes />
      </RecipeContextProvider>
    </Router>
  );
}

export default App;
