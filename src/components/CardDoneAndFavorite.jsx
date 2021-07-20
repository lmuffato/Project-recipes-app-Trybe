/*
- Esta função renderiza um card de receita pronta ou favorita
- Ela recebe como parâmetro as informações referentes à receita na variável "recipe"
  e as informações referentes ao local (favoritas ou feitas) na variável "local"
- A função rederiza um card com as devidas informações:
- caso local = 'favoritas', são disponiveis a seguintes infos em recipe:
    id: id-da-receita,
    type: comida-ou-bebida,
    area: area-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita
- caso local = 'feitas', são disponíveis as seguintes infos em recipe:
    id: id-da-receita,
    type: comida-ou-bebida,
    area: area-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita,
    doneDate: quando-a-receita-foi-concluida,
    tags: array-de-tags-da-receita-ou-array-vazio

O imagem do card de receita deve ter o atributo data-testid="${index}-horizontal-image";
O texto da categoria da receita deve ter o atributo data-testid="${index}-horizontal-top-text";
O texto do nome da receita deve ter o atributo data-testid="${index}-horizontal-name";
O texto da data que a receita foi feita deve ter o atributo data-testid="${index}-horizontal-done-date";
O elemento de compartilhar a receita deve ter o atributo data-testid="${index}-horizontal-share-btn";
As tags da receita devem possuir o atributo data-testid=${index}-${tagName}-horizontal-tag;
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonFavorite from './ButtonFavorite';
import ButtonShare from './ButtonShare';
import '../styleSheets/CardDoneAndFavorite.css';

function CardDoneAndFavorite(props) {
  const { recipe, local, index } = props;
  const { id, type, area, category, alcoholicOrNot, name, image } = recipe;
  const dbType = type === 'comida' ? 'themealdb' : 'thecocktaildb';
  const pathDetail = type === 'comida' ? 'comidas' : 'bebidas';
  const doneDateElement = local === 'feitas'
    ? (<span data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</span>)
    : '';
  const tagsInfo = local === 'feitas' ? recipe.tags : [];
  const tagsElements = tagsInfo.reduce((acc, tagName, index2) => {
    if (index2 < 2) {
      acc.push(
        <span
          data-testid={ `${index}-${tagName}-horizontal-tag` }
          className="tag-recipe"
          key={ index2 }
        >
          {tagName}
        </span>,
      );
    }
    return acc;
  }, []);

  const custonElement = type === 'bebida'
    ? (
      <span
        data-testid={ `${index}-horizontal-top-text` }
      >
        {alcoholicOrNot}
      </span>
    )
    : (
      <span
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${area} - ${category}`}
      </span>
    );
  return (
    <section
      className="done-favorite-card"
      tabIndex={ index }
      data-testid={ `${index}` }
    >
      <Link
        to={ `/${pathDetail}/${id}` }
      >
        <img
          src={ image }
          alt={ `Recipe of ${name}` }
          className="image-done-card"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div
        className="info-card"
      >
        <div>
          { custonElement }
          <ButtonShare
            idRecipe={ id }
            typeRecipe={ pathDetail }
            testid={ `${index}-horizontal-share-btn` }
          />
        </div>
        <Link
          to={ `/${pathDetail}/${id}` }
        >
          <h3
            className="title-done-card"
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </h3>
        </Link>
        {local === 'feitas' && doneDateElement}
        <div>{local === 'feitas' && tagsElements}</div>
        {local === 'favoritas'
          && <ButtonFavorite
            idRecipe={ id }
            dbType={ dbType }
            testid={ `${index}-horizontal-favorite-btn` }
          />}
      </div>
    </section>
  );
}

CardDoneAndFavorite.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  index: PropTypes.number.isRequired,
  local: PropTypes.string.isRequired,
};

export default CardDoneAndFavorite;
