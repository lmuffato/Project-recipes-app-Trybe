import { string, number } from 'prop-types';
import React from 'react';

function DoneDate({ index, doneDate }) {
  return (
    <h6 data-testid={ `${index}-horizontal-done-date` }>
      {`Feita em: ${doneDate}` }
    </h6>
  );
}

DoneDate.propTypes = {
  doneDate: string.isRequired,
  index: number.isRequired,
};

export default DoneDate;
