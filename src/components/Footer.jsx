import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  // const [searchInput, setSearchInput] = useState(false);

  return (
    <footer data-testid="footer">
      <div className="footer">
        <div className="footerItens">
          <Link to="/bebidas">
            <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="imagem drink" />
          </Link>
        </div>
        <div className="footerItens">
          <Link to="/explorar">
            <img
              data-testid="explore-bottom-btn"
              src={ exploreIcon }
              alt="imagem explore"
            />
          </Link>
        </div>
        <div className="footerItens">
          <Link to="/comidas">
            <img data-testid="food-bottom-btn" src={ mealIcon } alt="imagem drink" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  title: PropTypes.string,
  searchImg: PropTypes.bool,
}.isRequired;

export default Footer;
