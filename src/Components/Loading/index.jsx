import React from 'react';
import gif from '../../images/cooking_loader_2.gif';
import './styles.css';

function Loading() {
  return (
    <div className="loading">
      <img src={ gif } alt="Loading" />
    </div>
  );
}

export default Loading;
