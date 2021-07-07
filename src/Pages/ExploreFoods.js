import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RandomRecipe from '../helpers/getRandomRecipe';
import '../PagesCss/Explore.css';

function ExploreFoods() {
  const history = useHistory();
  const { meals } = RandomRecipe('comidas');
  let randomMeal = '';
  if (meals) {
    randomMeal = meals[0].idMeal;
  }

  return (
    <>
      <Header props={ { search: false, title: 'Explorar Comidas' } } />
      <main className="main-container">
        <section className="main-explore">
          <Button
            variant="light"
            size="lg"
            className="buttons"
            data-testid="explore-by-ingredient"
            onClick={ () => history.push('/explorar/comidas/ingredientes') }
          >
            Por Ingredientes
          </Button>
          <Button
            variant="light"
            size="lg"
            className="buttons"
            data-testid="explore-by-area"
            onClick={ () => history.push('/explorar/comidas/area') }
          >
            Por Local de Origem
          </Button>
          <Button
            variant="light"
            size="lg"
            className="buttons"
            data-testid="explore-surprise"
            onClick={ () => history.push(`/comidas/${randomMeal}`) }
          >
            Me Surpreenda!
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ExploreFoods;
