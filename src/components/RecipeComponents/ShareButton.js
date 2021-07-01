import React from 'react';
import Alert from 'react-bootstrap/Alert';
import shareIcon from '../../images/shareIcon.svg';

export default function ShareBtn() {
  const handleClick = () => {
    const temporary = document.createElement('input');
    const locate = window.location.href;
    document.body.appendChild(temporary);
    temporary.value = locate;
    temporary.select();
    document.execCommand('copy');
    document.body.removeChild(temporary);
    console.log(<Alert variant="info" key={ 1 }>Link Copiado!</Alert>);
    return (
      <Alert variant="primary" key={ 1 }>Link Copiado!</Alert>
    );
  };

  return (
    <input
      type="image"
      data-testid="share-btn"
      variant="light"
      style={ { height: '28px' } }
      onClick={ handleClick }
      src={ shareIcon }
      alt="shareButton"
    />
  );
}
