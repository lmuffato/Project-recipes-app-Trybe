import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import shareIcon from '../../images/shareIcon.svg';

function ShareButton({ dataTest }) {
  const history = useHistory();
  const URL = history.location.pathname;
  const fixedURL = `${URL.split('/')[1]}/${URL.split('/')[2]}`;
  const [isCopied, setIsCopied] = useState(false);
  const SECONDS_COPY = 2000;

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, SECONDS_COPY);
  };

  return (
    <CopyToClipboard text={ `http://localhost:3000/${fixedURL}` } onCopy={ onCopyText }>
      <div>
        <input
          type="image"
          data-testid={ dataTest }
          src={ shareIcon }
          alt="share button"
        />
        { isCopied ? <span> Link copiado! </span> : '' }
      </div>
    </CopyToClipboard>
  );
}
// REF: https://dev.to/myogeshchavan97/an-easy-way-for-adding-copy-to-clipboard-functionality-in-react-app-4oo0
ShareButton.propTypes = {
  dataTest: PropTypes.string,
}.isRequired;
export default ShareButton;
