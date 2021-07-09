import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

export default function ShareBtn(props) {
  const { dataTest, path } = props;
  const alertCreator = () => {
    const alert = document.createElement('div');
    const shareDiv = document.getElementsByClassName(`${dataTest}`)[0].parentElement;
    const div = document.getElementsByClassName(`${dataTest}`)[0];
    shareDiv.insertBefore(alert, div);
    alert.outerHTML = `<div class=" alert alert-warning alert-dismissible 
    fade show" role="alert">Link copiado!<button type="button" class="btn-close" 
    data-bs-dismiss="alert" aria-label="Close"></button></div>`;
  };

  const detailsPage = () => {
    const temporary = document.createElement('input');
    const locate = window.location.href;
    document.body.appendChild(temporary);
    temporary.className = 'temporary-div';
    temporary.value = locate;
    temporary.select();
    document.execCommand('copy');
    document.body.removeChild(temporary);
  };

  const doneRecipePage = () => {
    const temporary = document.createElement('input');
    document.body.appendChild(temporary);
    temporary.className = 'temporary-div';
    temporary.value = path;
    temporary.select();
    document.execCommand('copy');
    document.body.removeChild(temporary);
  };

  const handleClick = () => {
    if (path) {
      doneRecipePage();
    } else {
      detailsPage();
    }
    alertCreator();
  };

  return (
    <div>
      <input
        type="image"
        data-testid={ dataTest }
        className={ dataTest }
        variant="light"
        style={ { height: '28px' } }
        onClick={ handleClick }
        src={ shareIcon }
        alt="shareButton"
      />
    </div>
  );
}

ShareBtn.propTypes = {
  dataTest: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
