import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import RecomCard from './RecomCard';
import fetchRecomendations from '../service/fetchRecomendations';

function Recommendations(type) {
  const { recipe } = type;
  const [recommended, setRecommended] = useState({});

  useEffect(() => {
    async function requestRecom() {
      const request = await fetchRecomendations(recipe);
      return setRecommended(request);
    }
    requestRecom();
  }, []);

  return (
    <div>
      <h3>Recomendados</h3>
      { recommended.length ? recommended.map((recom, index) => (
        <div
          data-testid="0-recomendation-card"
          key={ index }
        >
          <RecomCard recipe={ recom } />
        </div>
      )) : ''}
    </div>
  );
}

export default Recommendations;
