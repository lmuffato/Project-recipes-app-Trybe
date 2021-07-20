import { number, string } from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

function Image({ url, index, type, id }) {
  const { push } = useHistory();

  return (
    <button
      onClick={ () => { push(`/${type}s/${id}`); } }
      type="button"
      className="icones-btn"
    >
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ url }
        width="200"
        alt="Grapefruit slice atop a pile of other slices"
        className="img-card"
      />
    </button>
  );
}

Image.propTypes = {
  url: string,
  index: number,
  type: string,
  id: string,
}.isRequired;

export default Image;
