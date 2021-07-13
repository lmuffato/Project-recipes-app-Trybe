import React from 'react';
import Routes from './routes/Routes';
import { RecipeContextProvider } from './store/RecipeContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return <Routes />;
}

export default App;
