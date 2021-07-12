import React from 'react';
import DrinksBtn from './DrinksBtn';
import ExploreBtn from './ExploreBtn';
import FoodBtn from './FoodBtn';
import './menuFooter.css';

export default function MenuFooter() {
  return (
    <div data-testid="footer" className="footer-container">
      <DrinksBtn />
      <ExploreBtn />
      <FoodBtn />
    </div>
  );
}
