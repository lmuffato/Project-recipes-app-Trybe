import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import MealsProvider from './context/MealsProvider';
import CocktailsProvider from './context/CocktailsProvider';
import UserProvider from './context/UserProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <UserProvider>
        <CocktailsProvider>
          <MealsProvider>
            {/* <Login /> */}
          </MealsProvider>
        </CocktailsProvider>
      </UserProvider>
    </div>
  );
}

export default App;
