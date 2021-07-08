import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function ExploreIngredients({ type }) {
  const i = useParams();
  console.log(type);
  console.log(i);
  const index = '';
  return (
    <div>
      <Header>
        <h2 data-testid="page-title">Explorar Ingredientes</h2>
      </Header>
      <section>
        <div data-testid={ `${index}-ingredient-card` }>
          <div className="img-wrapper">
            <img
              data-testid={ `${index}-card-img` }
              // style={ { maxWidth: '100px' } }
              // src={ recipeThumb }
              alt="Delicious food/drink"
            />
          </div>
          <div className="card-info">
            <p data-testid={ `${index}-card-name` }>recipeName</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreIngredients;
