import React from 'react';
import './Food.css';

// https://codemyui.com/flip-an-omelette-loading-animation-from-faasos/

export default function FoodLoader() {
  return (
    <div className="loader-container">
      <div className="pan-loader">
        <div className="loader" />
        <div className="pan-container">
          <div className="pan" />
          <div className="handle" />
        </div>
        <div className="shadow" />
      </div>
    </div>
  );
}
