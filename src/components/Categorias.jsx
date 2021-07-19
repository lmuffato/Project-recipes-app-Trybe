import React, { useContext } from 'react';
import { array } from 'prop-types';
import { useHistory } from 'react-router-dom';
import ContextComidas from '../provider/ContextComida';
import ContextBebidas from '../provider/ContextBebida';
import Loading from './Loading';

function Categorias({ param }) {
  const { setTexto: setComidas } = useContext(ContextComidas);
  const { setTexto: setBebidas } = useContext(ContextBebidas);

  const LOCATION = useHistory();

  const handleClick = ({ target, currentTarget }) => {
    setComidas(currentTarget.value || target.innerText);
    setBebidas(currentTarget.value || target.innerText);
  };

  const btns = () => param.map((item, idx) => {
    const magicNumber = 4;
    if (idx <= magicNumber) {
      return (
        <button
          type="button"
          key={ idx }
          value={ item.strCategory }
          onClick={ handleClick }
          data-testid={ `${item.strCategory}-category-filter` }
          className="btn btn-secondary border-secondary rounded-0 filters-buttons"
        >
          {item.strCategory}
        </button>
      );
    }
    return null;
  });

  const btnAll = () => (
    <button
      type="button"
      data-testid="All-category-filter"
      value="All"
      name="All"
      onClick={ handleClick }
      className="btn btn-secondary border-secondary rounded-0 filters-buttons danger"
    >
      All
    </button>
  );

  if (param === undefined || param.length < 1) {
    return LOCATION.location.pathname === '/comidas'
      ? <Loading param="food" />
      : <Loading param="drink" />;
  }

  return (
    <div className="d-flex justify-content-center flex-wrap mt-1">
      { btns() }
      { btnAll() }
    </div>
  );
}

Categorias.propTypes = {
  param: array,
}.isRequired;

export default Categorias;
