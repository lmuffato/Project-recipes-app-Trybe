import React from 'react';
import { bool } from 'prop-types';
import { BiDrink } from 'react-icons/bi';
import { MdExplore } from 'react-icons/md';
import { IoFastFoodSharp } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import FooterContainerButtons from './styles';

export default function Footer({ food = false, drink = false, explore = false }) {
  const history = useHistory();
  return (
    <FooterContainerButtons className="footer" data-testid="footer">
      <button type="button" onClick={ () => history.push('/bebidas') }>
        <BiDrink
          color={ drink ? '#FFF' : '#ffd8d8' }
          alt="Drink Icon"
          data-testid="drinks-bottom-btn"
        />
      </button>

      <button type="button" onClick={ () => history.push('/explorar') }>
        <MdExplore
          color={ explore ? '#FFF' : '#ffd8d8' }
          alt="Explore Icon"
          data-testid="explore-bottom-btn"
        />
      </button>

      <button type="button" onClick={ () => history.push('/comidas') }>
        <IoFastFoodSharp
          color={ food ? '#FFF' : '#ffd8d8' }
          alt="Food Icon"
          data-testid="food-bottom-btn"
        />
      </button>
    </FooterContainerButtons>
  );
}

Footer.propTypes = {
  food: bool,
  drink: bool,
  explore: bool,
}.isRequired;
