import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../styleSheets/Card.css';

function Card(props) {
  const { src, title, index, testid, redirectPath } = props;
  const history = useHistory();
  const sendToDetail = () => {
    history.push(redirectPath);
  };
  return (
    <section
      className="small-card"
      role="button"
      tabIndex={ index }
      onClick={ sendToDetail }
      onKeyPress={ sendToDetail }
      data-testid={ testid.card }
    >
      <img
        src={ src }
        alt={ `Recipe of ${title}` }
        className="image-card"
        data-testid={ testid.image }
      />
      <h3 className="title-card" data-testid={ testid.title }>{ title }</h3>
    </section>
  );
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  redirectPath: PropTypes.string.isRequired,
  testid: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    card: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
