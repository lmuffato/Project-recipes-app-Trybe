import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RecipesProvider from './provider/RecipesProvider';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <div>
          <h1>App</h1>
        </div>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
