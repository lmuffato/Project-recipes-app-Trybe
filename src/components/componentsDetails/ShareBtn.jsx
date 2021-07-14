import React, { useState } from 'react';
import { useHistory } from 'react-router';
import clipboardCopy from '../../services/clipboardCopy';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareBtn({ id, type }) {
  const [Url, setUrl] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    clipboardCopy(type, id);
    setUrl(true);
  };
  return (
    <div>
      <button
        id={  }
        type="button"
        onClick={ handleClick }
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="Share Icon"
        />
        <p id={`copyMessage${id}`}>Link copiado!</p>
      </button>
    </div>
  );
}
