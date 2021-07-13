import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';

import shareIcon from '../../images/shareIcon.svg';

function ShareButtonRecipes({ dataTest, recipe }) {
  const toggleUrlName = recipe.type === 'comida' ? 'comidas' : 'bebidas';
  const idUrl = recipe.id;
  const [isCopied, setIsCopied] = useState(false);
  const SECONDS_COPY = 2000;

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, SECONDS_COPY);
  };

  return (
    <CopyToClipboard text={ `http://localhost:3000/${toggleUrlName}/${idUrl}` } onCopy={ onCopyText }>
      <div>
        <input
          type="image"
          data-testid={ dataTest }
          src={ shareIcon }
          alt="share button"
        />
        { isCopied ? <span className="over-screen"> Link copiado! </span> : '' }
      </div>
    </CopyToClipboard>
  );
}
// REF: https://dev.to/myogeshchavan97/an-easy-way-for-adding-copy-to-clipboard-functionality-in-react-app-4oo0
ShareButtonRecipes.propTypes = {
  dataTest: PropTypes.string,
}.isRequired;
export default ShareButtonRecipes;
