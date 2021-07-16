import React from 'react';

function MealDetails() {

  const renderFavNShare = () => {
    return (
      <div>
        <button
          type="button"
          data-testid="share-btn"
        >
          share
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Fav
        </button>
      </div>
    );
  }

  const renderInstructions

  const renderDetail = () => {
    return (
      <div>
        <img
          src=""
          data-testid="recipe-photo"
        />
        <h1
          data-testid="recipe-title"
        >
          Recipe Name
        </h1>
        <p
          data-testid="recipe-category"
        >
          Recipe category
        </p>
      </div>
    );
  };

  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
}

export default MealDetails;
