import React, { useContext, useEffect } from 'react';
import FooterBar from '../components/FooterBar';
import Header from '../components/Header';
import ContextRecipes from '../context/ContextRecipes';

function ByOrigin() {
  const { countries, fetchArea } = useContext(ContextRecipes);

  useEffect(() => {
    fetchArea();
  }, []);

  return (
    <main>
      <Header />
      <select data-testid="explore-by-area-dropdown">
        { countries.map((country) => (
          <option key={ country } value={ country }>
            {country}
          </option>))}
      </select>
      <FooterBar />
    </main>
  );
}

export default ByOrigin;
