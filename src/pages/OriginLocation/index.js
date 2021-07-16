import React, { useEffect, useState } from 'react';
import { DropdownButton as select, Dropdown as option } from 'react-bootstrap';
import AreaCards from '../../components/AreaCards';
import FooterMenu from '../../components/footerMenu';
import Header from '../../components/Header';
import { foodsByArea, getAllOrigins, initialFoods } from '../../services/apiRequests';
import './css/OriginLocation.css';

export default function OriginLocation() {
  document.title = 'Explorar Origem';
  const maxLength = 11;
  const [origins, setOrigins] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState('American');
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getAllOrigins(setOrigins);
    if (selectedOrigin !== 'All') {
      foodsByArea(setRecipes, selectedOrigin);
    } else {
      initialFoods(setRecipes);
    }
  }, [selectedOrigin]);
  return (
    <>
      <Header searchBar="true" />
      <select
        value={ selectedOrigin }
        onChange={ (e) => setSelectedOrigin(e.target.value) }
        data-testid="explore-by-area-dropdown"
      >
        <option eventKey="All" data-testid="All-option">
          All
        </option>
        { origins && origins
          .map(({ strArea }, index) => (
            <option
              key={ index }
              value={ strArea }
              data-testid={ `${strArea}-option` }
            >
              { strArea }
            </option>)) }
      </select>
      <section className="card-list">
        { recipes && recipes
          .filter((_, index) => index <= maxLength)
          .map(({ idMeal, strMeal, strMealThumb }, index) => (<AreaCards
            key={ index }
            idMeal={ idMeal }
            strMealThumb={ strMealThumb }
            strMeal={ strMeal }
            index={ index }
          />)) }
      </section>
      <FooterMenu />
    </>
  );
}
