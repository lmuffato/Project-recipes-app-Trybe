import React, { useEffect, useState } from 'react';
import RecomCard from './RecomCard';
import fetchRecomendations from '../service/fetchRecomendations';
import '../styleSheets/styleRecom.css';

function Recommendations(type) {
  const { recipe } = type;
  const [recommended, setRecommended] = useState({});

  useEffect(() => {
    async function requestRecom() {
      const request = await fetchRecomendations(recipe);
      const six = 6;
      const maxRecom = Object.values(request).slice(0, six);
      return setRecommended(maxRecom);
    }
    requestRecom();
  }, []);

  return (
    <section className="container">
      <h3>Recomendados</h3>
      <div className="carousel-container">
        { recommended.length ? recommended.map((recom, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <RecomCard recipe={ recom } index={ index } />
          </div>
        )) : ''}
      </div>
    </section>
  );
}

export default Recommendations;
