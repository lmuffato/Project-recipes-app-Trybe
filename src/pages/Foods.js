import React from 'react';
import { Link } from 'react-router-dom';

function Foods() {
  return (
    <div>
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>

      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>

      <Link to="">
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
}

export default Foods;


/* 
/comidas/{id-da-receita};
/bebidas/{id-da-receita} */