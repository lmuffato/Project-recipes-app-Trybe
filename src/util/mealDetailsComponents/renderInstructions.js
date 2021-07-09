import React from 'react';

export default function RenderInstructions(strInst, ytEmb) {
  return (
    <>
      <p data-testid="instructions">{strInst}</p>
      { ytEmb && (
        <>
          <h2>Video</h2>
          <iframe
            type="text/html"
            title="recipe"
            width="330"
            height="315"
            src={ `https://www.youtube.com/embed/${ytEmb}` }
            data-testid="video"
          />
        </>
      )}
    </>
  );
}
