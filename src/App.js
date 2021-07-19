import React from 'react';
// import './styles/reset.css';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
// import SearchbarProvider from './contexts/SeachbarProvider';
import ProvidersManager from './contexts/ProvidersManager';

function App() {
  return (
    <ProvidersManager />
  );
}

export default App;
