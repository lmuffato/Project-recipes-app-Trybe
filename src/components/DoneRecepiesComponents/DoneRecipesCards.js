import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReceitasContext from '../../contexts/ReceitasContext';
import ShareBtn from '../RecipeComponents/ShareButton';
import TagMaker from './TagMaker';
import '../../styles/FavoriteCards.css';

function DoneRecipesCards() {
  const { filterValue } = useContext(ReceitasContext);
  const locate = window.location.href.split('receitas-feitas')[0];
  const retrieveLocalInfo = () => {
    let local = JSON.parse(localStorage.getItem('doneRecipes'));
    if (filterValue === 'Food') {
      local = local.filter((e) => e.type === 'comida');
    }
    if (filterValue === 'Drinks') {
      local = local.filter((e) => e.type === 'bebida');
    }
    return (local !== null && local);
  };
  return (
    <div>
      {
        retrieveLocalInfo() !== false
      && retrieveLocalInfo().map((e, i) => (
        <div key={ i } className="doneComponents">
          <Link to={ `${e.type}s/${e.id}` }>
            <img
              src={ e.image }
              data-testid={ `${i}-horizontal-image` }
              alt={ e.name }
              key={ i }
              className="image"
            />
            <h4 data-testid={ `${i}-horizontal-top-text` } className="doneCategory">
              {e.alcoholicOrNot !== ''
                ? `${e.category} - ${e.alcoholicOrNot}`
                : `${e.area} - ${e.category}` }
            </h4>
            <h2
              data-testid={ `${i}-horizontal-name` }
              className="doneTitle"
            >
              {e.name}

            </h2>
          </Link>
          <p data-testid={ `${i}-horizontal-done-date` }>{e.doneDate}</p>
          <ShareBtn
            dataTest={ `${i}-horizontal-share-btn` }
            path={ `${locate}${e.type}s/${e.id}` }
          />
          <TagMaker index={ i } />
        </div>
      ))
      }
    </div>);
}
export default DoneRecipesCards;
