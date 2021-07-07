import React from 'react';
import { Link } from 'react-router-dom';
import ExploreIcon from '../../images/exploreIcon.svg';

export default function ExploreBtn() {
  return (
    <div>
      <Link to="/explorar">
        <img src={ ExploreIcon } alt="Explore icon" data-testid="explore-bottom-btn" />
      </Link>
    </div>
  );
}
