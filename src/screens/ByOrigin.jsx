import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import FooterBar from '../components/FooterBar';
import fetchCountries from '../service/fetchCountries';
import Header from '../components/Header';
import ContextRecipes from '../context/ContextRecipes';

function ByOrigin() {
  const {
    fetchByCountry,
    filteredRecipe,
  } = useContext(ContextRecipes);
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('All');

  useEffect(() => {
    const loaldCountries = async () => {
      await fetchCountries()
        .then((list) => setCountryList(list));
    };
    loaldCountries();
  }, []);

  useEffect(() => {
    fetchByCountry(selectedCountry);
  }, [selectedCountry]);

  return (
    <main>
      <Header />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ ((e) => setSelectedCountry(e.target.value)) }
      >
        { countryList.map((area) => (
          <option key={ area } value={ area } data-testid={ `${area}-option` }>
            {console.log(selectedCountry)}
            {area}
          </option>))}
      </select>
      { filteredRecipe && filteredRecipe.reduce((acc, recipe, index) => {
        const cardsLength = 12;
        if (index < cardsLength) {
          const testid = {
            image: `${index}-card-img`,
            title: `${index}-card-name`,
            card: `${index}-recipe-card`,
          };
          const redirectPath = `/comidas/${recipe.idMeal}`;
          acc.push(
            <Card
              src={ recipe.strMealThumb }
              title={ recipe.strMeal }
              index={ index }
              key={ index }
              testid={ testid }
              redirectPath={ redirectPath }
            />,
          );
        }
        return acc;
      }, []) }
      <FooterBar />
    </main>
  );
}

export default ByOrigin;
