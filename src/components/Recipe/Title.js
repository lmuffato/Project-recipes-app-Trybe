import { string } from 'prop-types';
import React from 'react';

function Title({ title }) {
  return (
    <h2 data-testid="recipe-title">
      {title}
    </h2>
  );
}

Title.propTypes = {
  title: string.isRequired,
};

export default Title;
