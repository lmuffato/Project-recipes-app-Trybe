import React from 'react';
import shareIcon from '../../images/shareIcon.svg';

export default function ShareBtn() {
  const alertCreator = () => {
    const alert = document.createElement('div');
    const shareDiv = document.getElementsByClassName('share-btn')[0].parentElement;
    shareDiv.insertAdjacentElement('beforebegin', alert);
    alert.outerHTML = `<div class=" alert alert-warning alert-dismissible 
    fade show" role="alert">Link copiado!<button type="button" class="btn-close" 
    data-bs-dismiss="alert" aria-label="Close"></button></div>`;
  };

  const handleClick = () => {
    const temporary = document.createElement('input');
    const locate = window.location.href;
    document.body.appendChild(temporary);
    temporary.value = locate;
    temporary.select();
    document.execCommand('copy');
    document.body.removeChild(temporary);
    alertCreator();
  };

  return (
    <div>
      <input
        type="image"
        data-testid="share-btn"
        className="share-btn"
        variant="light"
        style={ { height: '28px' } }
        onClick={ handleClick }
        src={ shareIcon }
        alt="shareButton"
      />
    </div>
  );
}
