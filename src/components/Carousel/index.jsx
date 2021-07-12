import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function Carousel({ children }) {
  return (
    <div className={ styles.carousel }>
      <div className={ styles.content }>
        { children }
      </div>
    </div>
  );
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Carousel;
