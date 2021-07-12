import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');
// import { Container } from './styles';

export default function BtnShare({ match }) {
  const [isCopied, setIsCopied] = useState(false);
  const { url } = match;
  async function handleShareBtn() {
    await copy(`http://localhost:3000${url || match}`);
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
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};
