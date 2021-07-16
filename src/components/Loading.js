import React from 'react';
import '../styles/Loading.css';

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-text">
        <h3 className="loading-title">Loading</h3>
        <div className="dots-8" />
      </div>
    </div>
  );
}
