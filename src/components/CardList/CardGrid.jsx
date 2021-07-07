import React from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'pure-react-carousel';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
// import useFilteredRecipes from '../../hooks/useFilteredRecipes';
import { CarouselCardContainer } from '../Carousel/styles';
// import CardListContainer from './styles';

function CardGrid({ recipes, type }) {
  // const { filteredRecipes } = useFilteredRecipes();
  // // const history = useHistory();

  if (recipes.length === 0) {
    return 'Loading...';
  }

  return (
    <CarouselCardContainer>
      {recipes.length > 0 && recipes.map((recipe, i) => (
        type === 'meals' ? (
          <Slide index={ i } className="slide-size" key={ i }>
            <Link
              to={ { pathname: `/comidas/${recipe.idMeal}` } }
              key={ i }
            >
              <Card recipe={ recipe } index={ i } />
            </Link>
          </Slide>
        ) : (
          <Slide index={ i } className="slide-size" key={ i }>
            <Link
              to={ `/bebidas/${recipe.idDrink}` }
              key={ i }
            >
              <Card recipe={ recipe } index={ i } />
            </Link>
          </Slide>
        )
      ))}
    </CarouselCardContainer>
  );
}

export default CardGrid;

CardGrid.propTypes = {
  recipes: PropTypes.shape(PropTypes.arrayOf(PropTypes.object)),
  type: PropTypes.string,
}.isRequired;
