import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');
// import { Container } from './styles';

export default function BtnShare({ url }) {
  const [isCopied, setIsCopied] = useState(false);
  async function handleShareBtn() {
    await copy(`http://localhost:3000${url}`);
    setIsCopied(true);
  }
  return (
    <>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleShareBtn }
      >
        <img src={ shareIcon } alt="imagem compartilhar" />

      </button>
      {isCopied && <div>Link copiado!</div>}
    </>
  );
}
BtnShare.propTypes = {
  url: PropTypes.string.isRequired,

};
