import React, { useState } from 'react';
import copy from 'clipboard-copy';

import { number, string } from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

const customAlert = alert;
const LOCAL_HOST = 'http://localhost:3000';

function Share({ type, id, index }) {
  const [isShared, setIsShared] = useState(false);

  function copyToClipBoard() {
    copy(`${LOCAL_HOST}/${type}/${id}`);
    customAlert('Link copiado!');
    setIsShared(true);
  }
  return (
    <button
      className="icones-btn"
      type="button"
      data-testid={ `${index}-horizontal-share-btn` }
      onClick={ copyToClipBoard }
      src={ shareIcon }
    >
      <img src={ shareIcon } alt="Compartilhar" />
      {isShared && 'Link copiado!'}
    </button>
  );
}

Share.propTypes = {
  id: number,
  type: string,
  index: number,
}.isRequired;

export default Share;
