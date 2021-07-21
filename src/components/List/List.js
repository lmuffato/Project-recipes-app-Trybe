import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../../contexts/FoodContext';

export default function List({ list, dataTestid }) {

  const context = useContext(FoodContext);
  const { color: { colorDiv } } = context;

  console.log('contexto', context);

  return (
    <ul
      className="details-cards"
      style={ {
        display: 'flex',
        flexDirection: 'column',
        width: 335,
        marginLeft: 20,
        backgroundColor: colorDiv,
      } }
    >
      { list.map((item, index) => (
        <li
          style={ {
            marginLeft: 10,
            display: 'flex',
            alignItems: 'center',
          } }
          key={ index }
          data-testid={ `${index}${dataTestid}` }
        >
          <br />
          { item }
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.instanceOf(Array).isRequired,
  dataTestid: PropTypes.string.isRequired,
};
