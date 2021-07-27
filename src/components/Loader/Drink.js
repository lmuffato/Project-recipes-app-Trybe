import React from 'react';
import './Drink.css';

// https://codemyui.com/clinking-wine-glasses-loading-animation/

export default function DrinkLoader() {
  return (
    <div className="loader-container">
      <div className="wineglass left">
        <div className="top" />
      </div>
      <div className="wineglass right">
        <div className="top" />
      </div>
    </div>
  );
}
