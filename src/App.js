import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './compenents/Footer';
import MainRecepies from './compenents/MainRecepies';
import Provider from './contexts/Provider';

function App() {
  return (
    <Provider>
      <div className="meals">
        <MainRecepies />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
