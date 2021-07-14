import React, { useEffect, useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
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
      <DropdownButton 
        title={ selectedOrigin }
        onSelect={ (e) => setSelectedOrigin(e) }
        data-testid="explore-by-area-dropdown"
      >
        <Dropdown.Item eventKey="All" data-testid="All-option">
          All-option
        </Dropdown.Item>
        { origins && origins
          .map(({ strArea }, index) => (
            <Dropdown.Item
              key={ index }
              eventKey={ strArea }
              value={ strArea }
              data-testid={ `${strArea}-option` }
            >
              { strArea }
            </Dropdown.Item>)) }
      </DropdownButton>
      <section className="card-list">
        { recipes && recipes
          .filter((_, index) => index <= maxLength)
          .map(({ strMeal, strMealThumb }, index) => (<AreaCards
            key={ index }
            strMealThumb={ strMealThumb }
            strMeal={ strMeal }
            index={ index }
          />)) }
      </section>
      <FooterMenu />
    </>
  );
}
