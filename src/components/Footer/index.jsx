import React from 'react';
import { BiDrink } from 'react-icons/bi';
import { MdExplore } from 'react-icons/md';
import { IoFastFoodSharp } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import FooterContainerButtons from './styles';

export default function Footer() {
  const history = useHistory();
  return (
    <FooterContainerButtons
      className="footer"
      data-testid="footer"
    >
      <button type="button" onClick={ () => history.push('/bebidas') }>
        <BiDrink alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </button>

      <button type="button" onClick={ () => history.push('/explorar') }>
        <MdExplore alt="Explore Icon" data-testid="explore-bottom-btn" />
      </button>

      <button type="button" onClick={ () => history.push('/comidas') }>
        <IoFastFoodSharp alt="Food Icon" data-testid="food-bottom-btn" />
      </button>
    </FooterContainerButtons>
  );
}
