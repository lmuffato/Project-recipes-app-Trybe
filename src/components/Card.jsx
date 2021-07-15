import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import '../styleSheets/Card.css';

function Card(props) {
  const { src, title, id, index } = props;
  const history = useHistory();
  const { pathname } = useLocation();
  const sendToDetail = () => {
    history.push(`${pathname}/${id}`);
  };
  return (
    <section
      className="small-card"
      role="button"
      tabIndex={ index }
      onClick={ sendToDetail }
      onKeyPress={ sendToDetail }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ src }
        alt={ `Recipe of ${title}` }
        className="image-card"
        data-testid={ `${index}-card-img` }
      />
      <h3 className="title-card" data-testid={ `${index}-card-name` }>{ title }</h3>
    </section>
  );
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
