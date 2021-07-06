import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchbarProvider from './contexts/SeachbarProvider';
import ProvidersManager from './contexts/ProvidersManager';
import UserProvider from './contexts/UserProvider';

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
