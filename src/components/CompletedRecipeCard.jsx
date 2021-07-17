import React from 'react';

function CompletedRecipeCard() {
  const renderShareButton = () => {
    const index = 0;
    return (
      <div>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
        >
          button
        </button>
      </div>
    );
  };

  const renderCard = () => {
    const index = 0;
    return (
      <div>
        <img
          data-testid={ `${index}-horizontal-image` }
          src=""
          alt=""
        />
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          category
        </p>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          name
        </p>
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          done-date
        </p>
        { renderShareButton }
      </div>
    );
  };

  return (
    <div>
      { renderCard }
    </div>
  );
}

export default CompletedRecipeCard;
