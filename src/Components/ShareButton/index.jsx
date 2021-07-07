import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useHistory } from 'react-router';

import shareIcon from '../../images/shareIcon.svg';

function ShareButton() {
  const history = useHistory();
  const URL = history.location.pathname;
  const [isCopied, setIsCopied] = useState(false);
  const SECONDS_COPY = 2000;

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, SECONDS_COPY);
  };
  return (
    <CopyToClipboard text={ `http://localhost:3000${URL}` } onCopy={ onCopyText }>
      <div>
        <input
          className="share-btn"
          type="image"
          data-testid="share-btn"
          src={ shareIcon }
          alt="share button"
        />
        { isCopied ? <span> Link copiado! </span> : '' }
      </div>
    </CopyToClipboard>
  );
}
// REF: https://dev.to/myogeshchavan97/an-easy-way-for-adding-copy-to-clipboard-functionality-in-react-app-4oo0
export default ShareButton;
