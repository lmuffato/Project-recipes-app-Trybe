import React from 'react';
import PropTypes from 'prop-types';
import { LogoContainer } from './styles';

function Logo({ logoSrc }) {
  return (
    <LogoContainer>
      <img src={ logoSrc } alt="letmeEat" />
    </LogoContainer>
  );
}

export default Logo;

Logo.propTypes = {
  logoSrc: PropTypes.string.isRequired,
};
