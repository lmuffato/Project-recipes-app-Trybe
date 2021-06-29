import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiByAreas, ApiByCategory, ApiByIngredients, ApiRecipeDetail, ingredientImg } from './services/theMealDBAPI';

async function App() {
  // console.log(await ApiByCategory());
  // console.log(await ApiByAreas());
  // console.log(await ApiByIngredients());
  console.log(await ApiRecipeDetail(52777));

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
    </div>
  );
}

export default App;
