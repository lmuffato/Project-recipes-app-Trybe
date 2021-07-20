import React from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';
import shareBtnImg from '../images/shareIcon.svg';

function DetailsButtons({ product, idn }) {
  const [isCopy, setIsCopy] = React.useState(false);

  const handleClickShare = () => {
    setIsCopy(true);
    // navigator.clipboard.writeText(window.location.href)
    const url = window.location.href.split('/');
    const maxLength = 6;
    if (url.length === maxLength) {
      url.pop();
      navigator.clipboard.writeText(url.join('/'));
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      { isCopy && <h4>Link copiado!</h4> }
      <FavoriteButton product={ product } idn={ idn } />
      <input
        type="image"
        data-testid="share-btn"
        onClick={ handleClickShare }
        id="share-btn"
        src={ shareBtnImg }
        alt="Share button"
      />
    </>
  );
}

DetailsButtons.propTypes = {
  product: PropTypes.array,
  idn: PropTypes.string,
}.isRequired;

export default DetailsButtons;
