import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from './CardsComponents/Cards';
import ReceitasContext from '../contexts/ReceitasContext';

function CardList({ list }) {
  const maxLength = 12;
  const { filter } = useContext(ReceitasContext);

  if (list.length > 1 || filter === true) {
    const arr = [];
    for (let index = 0; index < maxLength; index += 1) {
      const element = list[index];
      arr.push(element);
    }
    return (
      arr.map((recipie, index) => {
        const { idMeal, idDrink } = recipie;
        if (recipie !== undefined) {
          if (recipie.strMeal !== undefined) {
            return (
              <Card
                type="comidas"
                id={ idMeal }
                index={ index }
                key={ index }
                strName={ recipie.strMeal }
                strThumb={ recipie.strMealThumb }
                strId={ recipie.idMeal }
                page="comidas"
              />
            );
          } return (
            <Card
              type="bebidas"
              id={ idDrink }
              index={ index }
              key={ index }
              strName={ recipie.strDrink }
              strThumb={ recipie.strDrinkThumb }
              strId={ recipie.idDrink }
              page="bebidas"
            />
          );
        } return (<span key={ index } />);
      }));
  }
  return (
    <Redirect
      to={ list[0].idMeal !== undefined
        ? (`/comidas/${list[0].idMeal}`)
        : (`/bebidas/${list[0].idDrink}`) }
    />
  );
}

CardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default CardList;
