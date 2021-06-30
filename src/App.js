import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './compenents/Footer';
import SearchBar from './compenents/SearchBar';

function App() {
  return (
    <div className="meals">
      <SearchBar />
      <Footer />
    </div>
  );
}

export default App;
