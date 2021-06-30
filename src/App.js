import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './compenents/Footer';
import SearchBar from './compenents/SearchBar';

function App() {
  return (
    <div className="meals">
      <SearchBar />
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <Footer />
    </div>
  );
}

export default App;
