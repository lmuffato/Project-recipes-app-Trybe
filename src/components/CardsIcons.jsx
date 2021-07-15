import React from 'react';
import styled from 'styled-components';
import favoriteIcon from '../icons/appIcons/favoriteDisabled.png';
import checkIcon from '../icons/appIcons/checkDisabled.png';

function CardsIcons() {
  return (
    <Container className="icons-wrapper">
      <img className="check-icon" src={ checkIcon } alt="Check Icon" />
      <img className="fav-icon" src={ favoriteIcon } alt="Favorite Icon" />
    </Container>
  );
}

export default CardsIcons;

const Container = styled.div`
  .icons-wrapper {
    display: flex;
    flex-flow: row-reverse nowrap;
    justify-content: center;
    position: absolute;
  }

  .fav-icon {
    width: 14px;
    height: 12px;
    margin-left: 70px;
    margin-bottom: 5px;
  }

  .check-icon {
    width: 14px;
    height: 12px;
    margin-bottom: 5px;
  }
`;
