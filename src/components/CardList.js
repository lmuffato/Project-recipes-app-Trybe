import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from './CardsComponents/Cards';
import ReceitasContext from '../contexts/ReceitasContext';
import '../styles/Card.css';

function CardList({ list, type }) {
  const maxLength = 12;
  const { filter } = useContext(ReceitasContext);

  if (list.length > 1 || filter === true) {
    const arr = [];
    for (let index = 0; index < maxLength; index += 1) {
      const element = list[index];
      arr.push(element);
    }
    return (
      <div className="cards-container">
        {arr.map((recipie, index) => {
          if (recipie !== undefined) {
            if (type === 'comidas') {
              return (
                <Card
                  type="comidas"
                  id={ recipie.idMeal }
                  index={ index }
                  key={ index }
                  strName={ recipie.strMeal }
                  strThumb={ recipie.strMealThumb }
                  strId={ recipie.idMeal }
                  page="comidas"
                />
              );
            }
            return (
              <Card
                type="bebidas"
                id={ recipie.idDrink }
                index={ index }
                key={ index }
                strName={ recipie.strDrink }
                strThumb={ recipie.strDrinkThumb }
                strId={ recipie.idDrink }
                page="bebidas"
              />
            );
          } return (<span key={ index } />);
        })}
      </div>
    );
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
  type: PropTypes.string.isRequired,
};

export default CardList;
