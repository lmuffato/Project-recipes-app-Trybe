import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useFetchRecipes from '../effects/useFetchRecipes';
import Card from '../components/Card/Card';

function Home(props) {
  const { type } = props;
  const fetchData = useFetchRecipes(type);
  const [recipes, setRecipes] = useState([]);
  console.log('recipes:', recipes);

  useEffect(() => {
    if (fetchData.meals) setRecipes(fetchData.meals);
  }, [fetchData]);

  return (
    <div>
      { recipes.length === 0 ? 'Loading...'
        : recipes.map((recipe, i) => <Card recipe={ recipe } key={ i } index={ i } />) }
    </div>
  );
}

Home.propTypes = {
  recipe: PropTypes.string,
}.isRequired;

export default Home;
