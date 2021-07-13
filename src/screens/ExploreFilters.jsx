import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FooterBar from '../components/FooterBar';
import HeaderExplore from '../components/HeaderExplore';
import fetchRandomRecipe from '../service/fetchRandomRecipe';

function ExploreFilters() {
  const { pathname } = useLocation();
  const recipeType = pathname.includes('comidas') ? 'Meal' : 'Drink';
  const [id, setId] = useState('');
  const typePosition = 9;
  useEffect(() => {
    const getId = async () => setId(await fetchRandomRecipe(recipeType));
    getId();
  }, [recipeType]);
  const exploreByAreaLink = (
    <Link
      to={ `${pathname}/area` }
      data-testid="explore-by-area"
    >
      Por Local de Origem
    </Link>
  );
  return (
    <main>
      <HeaderExplore />
      <Link
        to={ `${pathname}/ingredientes` }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>

      {pathname === '/explorar/comidas' && exploreByAreaLink}

      <Link
        to={ `${pathname.slice(typePosition)}/${id}` }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Link>
      <FooterBar />
    </main>
  );
}

export default ExploreFilters;
