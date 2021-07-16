import { object } from 'prop-types';
import React from 'react';

function Loading({ param }) {
  const food = 'https://cdn.dribbble.com/users/242557/screenshots/6134238/untitled-2.gif';
  const drink = 'https://cdn.dribbble.com/users/714651/screenshots/15496945/dribbble-drink.gif';

  return (
    <div>
      <img
        className="d-flex w-25 mx-auto"
        src={ param === 'food' ? food : drink }
        alt="loading-gif"
      />
    </div>
  );
}

Loading.propTypes = {
  param: object,
}.isRequired;

export default Loading;
