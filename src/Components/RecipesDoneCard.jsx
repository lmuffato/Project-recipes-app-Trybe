import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import heartBlackIcon from '../images/blackHeartIcon.svg';
import ShareImg from '../images/shareIcon.svg';
import { FoodContext } from '../Context/FoodProvider';

const RecipesDoneCard = ({ list, tag, heart }) => {
  const [isCopy, setIsCopy] = React.useState(false);
  const { setFavoriteRecipesFilter } = useContext(FoodContext);
  const history = useHistory();

  const handleClickShare = (elem) => {
    setIsCopy(true);
    navigator.clipboard.writeText(`http://localhost:3000/${elem.type}s/${elem.id}`);
  };
  const hundleClick = (elem) => {
    const url = `/${elem.type}s/${elem.id}`;
    history.push(url);
  };

  const hundleClick2 = (idD) => {
    const array = list.filter((elem) => elem.id !== idD);
    setFavoriteRecipesFilter(array);
    localStorage.setItem('favoriteRecipes', JSON.stringify(array));
  };

  const checkType = (elem, index) => {
    if (elem.type === 'comida') {
      return (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${elem.area} - ${elem.category}`}
        </p>
      );
    }
    return (<p data-testid={ `${index}-horizontal-top-text` }>{elem.alcoholicOrNot}</p>);
  };
  return (
    <>
      { isCopy && <h4>Link copiado!</h4> }
      {list.map((elem, index) => (
        <div key={ `${index}-horizontal-name` }>
          <input
            className="image-click"
            type="image"
            data-testid={ `${index}-horizontal-image` }
            src={ elem.image }
            alt="recipe"
            onClick={ () => hundleClick(elem) }
          />
          { checkType(elem, index)}
          <button
            type="button"
            onClick={ () => hundleClick(elem) }
            data-testid={ `${index}-horizontal-name` }
          >
            {elem.name}
          </button>
          <input
            type="image"
            src={ ShareImg }
            alt="Share Recipe"
            onClick={ () => handleClickShare(elem) }
            data-testid={ `${index}-horizontal-share-btn` }
          />
          <p data-testid={ `${index}-horizontal-done-date` }>{elem.doneDate}</p>
          {tag && elem.tags.map((tag2) => (
            <div key={ `${index}-${tag}-horizontal-tag` }>
              <span data-testid={ `${index}-${tag2}-horizontal-tag` }>{tag2}</span>
            </div>
          ))}
          {heart
            && <input
              type="image"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ heartBlackIcon }
              alt="recipe"
              onClick={ () => hundleClick2(elem.id) }
            />}
        </div>
      ))}
    </>
  );
};

RecipesDoneCard.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  tag: PropTypes.bool.isRequired,
  heart: PropTypes.bool.isRequired,
}.isRequired;

export default RecipesDoneCard;
