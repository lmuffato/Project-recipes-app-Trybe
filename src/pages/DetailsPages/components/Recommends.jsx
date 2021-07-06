import React, { useContext } from 'react';
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../../../context/Context';
import makeArray from '../../../services/MakeArray/makeArr';

const Recommends = ({ drink }) => {
  const { foodRecommended, drinkRecommended } = useContext(Context);
  let arr = [];
  if (foodRecommended) {
    arr = makeArray(foodRecommended); // esta funcao recebe um array de 6 objetos, e retorna um de 3, sendo que cada indice desse 3 objetos há 2 cards recomendados
  }
  if (drinkRecommended && drink) {
    arr = makeArray(drinkRecommended);
  }
  return (
    <>
      <h4>Recommended</h4>
      <Carousel interval={ null }>
        {arr.map((doubleCard) => doubleCard)}
      </Carousel>
    </>
  );
};

Recommends.propTypes = {
  drink: PropTypes.object,
}.isRequired;

export default Recommends;
