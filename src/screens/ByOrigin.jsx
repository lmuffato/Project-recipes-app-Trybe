import React, { useContext, useEffect, useState } from 'react';
import FooterBar from '../components/FooterBar';
import Header from '../components/Header';
import ContextRecipes from '../context/ContextRecipes';

function ByOrigin() {
  const {
    countries,
    fetchArea,
    fetchByCountry,
    // filteredByCountry,
  } = useContext(ContextRecipes);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    fetchArea();
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
        { countries.map((area) => (
          <option key={ area } value={ area } data-testid={ `${area}-option` }>
            {console.log(selectedCountry)}
            {area}
          </option>))}
      </select>
      <FooterBar />
    </main>
  );
}

export default ByOrigin;
