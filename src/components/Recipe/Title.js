import { string } from 'prop-types';
import React from 'react';

function Title({ title }) {
  return (
    <h3 className="titulo-detalhes" data-testid="recipe-title">
      {title}
    </h3>
  );
}

Title.propTypes = {
  title: string.isRequired,
};

export default Title;
