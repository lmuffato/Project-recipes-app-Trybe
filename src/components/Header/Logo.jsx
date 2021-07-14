import React from 'react';
// import logoIcon from '../../images/appLogoIcon.svg';
// import logoIcon from '../../images/savory.png';
import logoIcon from '../../images/savory-6.svg';
import { LogoContainer } from './styles';

function Logo() {
  return (
    <LogoContainer>
      <img src={ logoIcon } alt="" />
    </LogoContainer>
  );
}

export default Logo;
