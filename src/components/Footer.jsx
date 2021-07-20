import React from 'react';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <footer data-testid="footer" className="footer">
        <input
          type="image"
          src={ drinkIcon }
          alt="taça"
          data-testid="drinks-bottom-btn"
          onClick={ () => history.push('/bebidas') }
        />
        <input
          src={ exploreIcon }
          type="image"
          alt="Bússola"
          data-testid="explore-bottom-btn"
          onClick={ () => history.push('/explorar') }
        />
        <input
          src={ mealIcon }
          type="image"
          alt="Garfos"
          data-testid="food-bottom-btn"
          onClick={ () => history.push('/comidas') }
        />
      </footer>
    );
  }
}

Footer.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Footer;
