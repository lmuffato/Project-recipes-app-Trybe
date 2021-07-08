import React from 'react';

export default function RenderRecipeImg(img) {
  return (
    <img
      className="recipe-img"
      alt="recipe"
      data-testid="recipe-photo"
      src={ img }
    />
  );
}
