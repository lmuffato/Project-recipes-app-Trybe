import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class EmProgInfos extends React.Component {
  render() {
    const { thumbnail, title, pathname, category, instructions } = this.props;
    return (
      <div>
        <img data-testid="recipe-photo" src={ thumbnail } alt={ title } />
        <h5 data-testid="recipe-title">{title}</h5>
        <div id="share">
          <input
            type="image"
            data-testid="share-btn"
            src={ shareIcon }
            alt="Compartilhar receita"
            onClick={ () => this.onClickShare(pathname) }
          />
          <input
            type="image"
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            alt="favoritar receita"
          />
        </div>
        <span data-testid="recipe-category">{category}</span>
        <p data-testid="instructions">{instructions}</p>
      </div>
    );
  }
}

EmProgInfos.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  pathname: PropTypes.string,
  instructions: PropTypes.string,
}.isRequired;

export default EmProgInfos;
