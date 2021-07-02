import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';
// import { ApiByRandom } from '../services/theMealAPI';
import Header from '../components/Header';
import MealsContext from '../context/MealsContext';

export default function ExploreFood() {
  const history = useHistory();
  const { handleRandomMealDetails } = useContext(MealsContext);

  const handleClick = async ({ target }) => {
    const { name } = target;
    if (name === 'ingredient') {
      history.push('/explorar/comidas/ingredientes');
    }
    if (name === 'area') {
      history.push('/explorar/comidas/area');
    }
    if (name === 'surprise') {
      await handleRandomMealDetails();
    }
  };

  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Explorar Comidas</h1>
      </Header>
      <Button
        variant="dark"
        data-testid="explore-by-ingredient"
        name="ingredient"
        onClick={ handleClick }
      >
        Por Ingredientes
      </Button>
      <Button
        variant="dark"
        data-testid="explore-by-area"
        name="area"
        onClick={ handleClick }
      >
        Por Local de Origem
      </Button>
      <Button
        variant="dark"
        data-testid="explore-surprise"
        name="surprise"
        onClick={ handleClick }
      >
        Me Surpreenda!
      </Button>
    </div>
  );
}
