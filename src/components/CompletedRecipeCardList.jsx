import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.png';

const copy = require('clipboard-copy');

function CompletedRecipeCardList({ list }) {
  const [copyText, setText] = useState({});

  function copyBoard(type, id) {
    let correctSTR = '';
    if (type === 'comida') {
      correctSTR = 'comidas';
    }
    if (type === 'bebida') {
      correctSTR = 'bebidas';
    }
    const endPoint = `http://localhost:3000/${correctSTR}/${id}`;
    setText({ ...copyText, [id]: 'Link copiado!' });
    copy(endPoint);
  }

  const renderShareButton = (data, index) => {
    const { id, type } = data;
    return (
      <div>
        { copyText[id] ? copyText[id] : '' }
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => copyBoard(type, id) }
          src={ shareIcon }
        >
          <img
            src={ shareIcon }
            alt="share button"
            width="26px"
          />
        </button>
      </div>
    );
  };

  const handleTags = (tags, index) => {
    const magicNum = 2;
    const first2 = tags ? tags.slice(0, magicNum) : [];
    const toReturn = first2.map((ele) => (
      <li
        data-testid={ `${index}-${ele}-horizontal-tag` }
        key={ ele }
      >
        { ele }
      </li>
    ));
    return toReturn;
  };

  const handleTextCat = (data) => {
    const { category, area, alcoholicOrNot } = data;
    const toReturn = area ? `${area} - ${category}`
      : `${alcoholicOrNot}`;
    return toReturn;
  };

  const renderCardDates = (data, index) => {
    const { name, doneDate, tags, type, id } = data;
    return (
      <div>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { handleTextCat(data) }
        </p>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          <Link to={ { pathname: `/${type}s/${id}` } }>
            { name }
          </Link>
        </p>
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          { doneDate }
        </p>
        <ul>{ handleTags(tags, index) }</ul>
      </div>
    );
  };

  const renderLeftSideCard = (data, index) => (
    <div>
      { renderShareButton(data, index) }
      { renderCardDates(data, index) }
    </div>
  );

  const renderImg = (data, index) => {
    const { image, type, id } = data;
    return (
      <div>
        <Link to={ { pathname: `/${type}s/${id}` } }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ `${image}` }
            alt="recipe-img"
            className="img"
          />
        </Link>
      </div>
    );
  };

  const renderCard = () => {
    const toReturn = list.map((ele, index) => {
      const { name } = ele;
      return (
        <div key={ name }>
          { renderImg(ele, index) }
          { renderLeftSideCard(ele, index) }
        </div>
      );
    });
    return toReturn;
  };

  return (
    <div className="component">
      { renderCard() }
    </div>
  );
}

CompletedRecipeCardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default CompletedRecipeCardList;
