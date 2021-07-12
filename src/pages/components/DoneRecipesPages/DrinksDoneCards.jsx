import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../../images/shareIcon.svg';
import './cards.css';

export default function DrinksDoneCards({ props: { recipe, index } }) {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    const treeSeconds = 3000;
    setShow(true);
    setTimeout(() => { setShow(false); }, treeSeconds);
  };
  if (recipe) {
    const size = 2;
    const { name, id, category, image, doneDate, tags, alcoholicOrNot } = recipe;
    return (
      <div key={ name }>
        <h1 style={ show ? {} : { display: 'none' } }>Link copiado!</h1>
        <Link to={ `/bebidas/${id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          <img
            style={ { width: '50px' } }
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <h3
          data-testid={ `${index}-horizontal-top-text` }
        >
          { ` ${alcoholicOrNot} - ${category}` }
        </h3>
        {/* https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
          Site em que aprendi a copiar para o clipboard
        */}
        <button
          type="button"
          onClick={ async () => {
            await navigator.clipboard
              .writeText(`http://localhost:3000/bebidas/${id}`);
            return handleClick;
          } }
        >
          <img
            src={ shareIcon }
            alt="share"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
        {tags.slice(0, size).map((tagName, tagIndex) => (
          <p
            key={ tagName }
            data-testid={ `${tagIndex}-${tagName}-horizontal-tag` }
          >
            {tagName}
          </p>
        )) }
      </div>
    );
  }
  return ('');
}
