import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ExploreButtons = ({ page }) => {
  const [foodOrDrink, setFoodOrDrink] = React.useState();

  React.useEffect(() => {
    if (page === 'food') setFoodOrDrink('comidas');
    if (page === 'drink') setFoodOrDrink('bebidas');
  }, [page]);
  const areaBtn = () => (
    <Link
      to="/explorar/comidas/area"
    >
      <button type="button" data-testid="explore-by-area">
        Por Local de Origem
      </button>
    </Link>);

  return (
    <div>
      <Link to={ `/explorar/${foodOrDrink}/ingredientes` }>
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      {page === 'food' && areaBtn()}
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
};

ExploreButtons.propTypes = {
  page: PropTypes.string.isRequired,
}.isRequired;

export default ExploreButtons;
