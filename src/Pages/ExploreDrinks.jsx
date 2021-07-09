import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import ExploreButtons from '../Components/ExploreButtons';

const ExploreDrinks = () => (
  <div>
    <div>
      <Header />
      <ExploreButtons page="drink" />
      <Footer />
    </div>
  </div>
);

export default ExploreDrinks;
