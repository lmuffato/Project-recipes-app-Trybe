import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import SearchbarProvider from './contexts/SeachbarProvider';
import ProvidersManager from './contexts/ProvidersManager';

function App() {
  return (
    <ProvidersManager />
  );
}

export default App;
