import React from 'react';

function DetailsButtons() {
  const [isAFavorite, setFavorite] = React.useState(false);

  const handleClick = () => {
    if (isAFavorite === false) {
      setFavorite(true);
    }
  };
  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleClick }
      >
        Bookmark
      </button>
    </>
  );
}

export default DetailsButtons;
