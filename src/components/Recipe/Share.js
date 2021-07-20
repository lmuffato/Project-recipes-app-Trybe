import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';

import shareIcon from '../../images/shareIcon.svg';

const customAlert = alert;
const LOCAL_HOST = 'http://localhost:3000';

function Share() {
  const { pathname } = useLocation();
  const [isShared, setIsShared] = useState(false);

  function copyToClipBoard() {
    copy(`${LOCAL_HOST}${pathname}`);
    customAlert('Link copiado!');
    setIsShared(true);
  }
  return (
    <button
      type="button"
      data-testid="share-btn"
      className="icones-btn"
      onClick={ copyToClipBoard }
    >
      <img src={ shareIcon } alt="Compartilhar" />
      {isShared && 'Link copiado!'}
    </button>
  );
}

export default Share;
