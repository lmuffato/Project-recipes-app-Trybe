import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProvider from './contexts/UserProvider';
import SearchbarProvider from './contexts/SeachbarProvider';
import ProvidersManager from './contexts/ProvidersManager';

function App() {
  return (
    <div className="meals">
      <UserProvider>
        <SearchbarProvider>
          <ProvidersManager />
        </SearchbarProvider>
      </UserProvider>
    </div>
  );
}

export default App;
