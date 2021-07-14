import React, { useState, useEffect } from 'react';

import { Dropdown } from 'react-bootstrap';
import useRecipe from '../../hooks/useRecipe';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipeCard from '../../components/RecipeCard';

import { fetchAreas, fetchByArea, fetchName } from '../../services/data';

import { FilterContainer } from '../../styles/shared/MainDetails/MainDetailsStyles';
import { StyledDropDown, MainContainerFoodArea } from './styles';
import ContainerRecipeCards from '../../styles/shared/ContainerRecipeCards';

export default function FoodArea() {
  const { setLoading, renderLoading } = useRecipe();
  const [recipes, setRecipes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [region, setRegion] = useState('All');

  const filter12Recipes = (rcp) => {
    const maxLengthRecipes = 12;
    const filteredRecipe = rcp.filter(
      (drink, index) => index < maxLengthRecipes,
    );
    return filteredRecipe;
  };

  useEffect(() => {
    const fetchDidMount = async () => {
      setLoading(true);
      const responseAreas = await fetchAreas();
      setAreas(responseAreas.meals);
      setLoading(false);
    };

    fetchDidMount();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      if (region === 'All') {
        const responseRecipesByArea = await fetchName('meal');
        setRecipes(filter12Recipes(responseRecipesByArea.meals));
        setLoading(false);
        return;
      }

      const responseByRegion = await fetchByArea(region);
      setRecipes(filter12Recipes((responseByRegion.meals)));
      setLoading(false);
    };

    fetchCategory();
  }, [region]);

  return (
    <MainContainerFoodArea>
      <Header title="Explorar Origem" searchIcon />

      <FilterContainer>
        <StyledDropDown
          data-testid="explore-by-area-dropdown"
          id="dropdown-split-variants-Danger"
          title="Filtros"
          variant="danger"
        >
          <Dropdown.Item
            value="All"
            data-testid="All-option"
            onClick={ ({ target }) => setRegion(target.innerText) }
          >
            All
          </Dropdown.Item>
          {areas.map(({ strArea }) => (
            <Dropdown.Item
              data-testid={ `${strArea}-option` }
              value={ strArea }
              key={ strArea }
              onClick={ ({ target }) => setRegion(target.innerText) }
            >
              {strArea}
            </Dropdown.Item>
          ))}
        </StyledDropDown>

        <span>{region}</span>
      </FilterContainer>

      {renderLoading(
        <ContainerRecipeCards>
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={ recipe.idMeal }
              index={ index }
              thumb={ recipe.strMealThumb }
              title={ recipe.strMeal }
              id={ recipe.idMeal }
            />
          ))}
        </ContainerRecipeCards>,
      )}

      <Footer explore />
    </MainContainerFoodArea>
  );
}
