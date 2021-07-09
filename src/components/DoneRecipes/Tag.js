import { string, number } from 'prop-types';
import React from 'react';

function Tag({ tags, index }) {
  return (
    <div>
      {
        tags.filter((tagIsTrue, i) => i < 2)
          .map((tagName) => (
            <h6 key={ tagName } data-testid={ `${index}-${tagName}-horizontal-tag` }>
              {tagName}
            </h6>
          ))
      }
    </div>
  );
}

Tag.propTypes = {
  tags: string.isRequired,
  index: number.isRequired,
};

export default Tag;
