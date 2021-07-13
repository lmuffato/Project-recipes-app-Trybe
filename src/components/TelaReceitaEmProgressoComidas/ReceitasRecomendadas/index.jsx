import React from 'react';
import './styles.module.scss';

function ReceitasRecomendadas() {
  return (
    <div id="recomendedId-container">
      Recomendadas
      <div id="recomended-container">
        <div>
          <div className="recomended" data-testid="recipe-photo" />
          <div className="recomended-name">Bible Belt</div>
        </div>
        <div>
          <div className="recomended" data-testid="recipe-photo" />
          <div className="recomended-name">Bible Belt</div>
        </div>
      </div>
    </div>
  );
}

export default ReceitasRecomendadas;
