import { number, string } from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

function Title({ title, index, type, id }) {
  const { push } = useHistory();

  return (
    <button
      onClick={ () => { push(`/${type}s/${id}`); } }
      type="button"
      className="done-title"
    >
      <h2 data-testid={ `${index}-horizontal-name` }>
        {title}
      </h2>
    </button>
  );
}

Title.propTypes = {
  title: string,
  index: number,
  type: string,
  id: string,
}.isRequired;

export default Title;
