import React from 'react';
import { string, number, objectOf } from 'prop-types';
import DoneRecipesImports from './DoneRecipesImports';

function DoneRecipeCard({
  id, type, area, category, alcoholicOrNot, name, image, index, tags, doneDate,
}) {
  return (
    <section className="done-card">
      <DoneRecipesImports.Image
        index={ index }
        url={ image }
        type={ type }
        id={ id }
      />
      <div className="done-content">
        <DoneRecipesImports.Category
          index={ index }
          category={ type === 'comida' ? `${area} - ${category}` : alcoholicOrNot }
        />
        <DoneRecipesImports.Title
          index={ index }
          title={ name }
          type={ type }
          id={ id }
        />
        <DoneRecipesImports.Share
          id={ id }
          index={ index }
          type={ `${type}s` }
        />
        <DoneRecipesImports.DoneDate
          doneDate={ doneDate }
          index={ index }
        />
        <DoneRecipesImports.Tag
          tags={ tags }
          index={ index }
        />
      </div>
    </section>
  );
}

DoneRecipeCard.propTypes = {
  id: string.isRequired,
  index: number.isRequired,
  type: string.isRequired,
  name: string.isRequired,
  image: string.isRequired,
  category: string.isRequired,
  area: string,
  alcoholicOrNot: string,
  tags: objectOf(string),
  doneDate: string.isRequired,
};

DoneRecipeCard.defaultProps = {
  area: '',
  alcoholicOrNot: '',
  tags: [],
};

export default DoneRecipeCard;
