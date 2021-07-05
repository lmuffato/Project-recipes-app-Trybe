import React, { useContext } from 'react';
import { array } from 'prop-types';
import ContextComidas from '../provider/ContextComida';
import ContextBebidas from '../provider/ContextBebida';
// import { mealsAPI } from '../services/apisMealsAndCocktails';

function Categorias({ param }) {
  const { setTexto: setComidas } = useContext(ContextComidas);
  const { setTexto: setBebidas } = useContext(ContextBebidas);
  // const [isClick, setIsClick] = useState(false);

  const handleClick = ({ target, currentTarget }) => {
    // console.log(currentTarget.value);
    setComidas(currentTarget.value || target.innerText);
    setBebidas(currentTarget.value || target.innerText);
  };

  // const btns = () => {
  //   const magicNumber = 4;
  //   return param.map((item, idx) => {
  //     if (idx <= magicNumber) {
  //       return (
  //         <ToggleButton
  //           key={ idx }
  //           type="radio"
  //           variant="secondary"
  //           name="radio"
  //           value={ item.strCategory }
  //           onChange={ handleClick }
  //           checked={ radioValue === item.strCategory }
  //           data-Testid={ `${item.strCategory}-category-filter` }
  //         >
  //           {item.strCategory}
  //         </ToggleButton>);
  //     }
  //   });
  // };

  // const btnAll = () => (
  //   <ToggleButton
  //     type="radio"
  //     variant="secondary"
  //     name="radio"
  //     data-testid="All-category-filter"
  //     value="All"
  //     onClick={ handleClick }
  //     checked={ radioValue === 'All' }
  //     // className="btn btn-success m-3 border border-success shadow p-3"
  //   >
  //     All
  //   </ToggleButton>
  // );

  const btns = () => param.map((item, idx) => {
    const magicNumber = 4;
    if (idx <= magicNumber) {
      return (
        <button
          type="button"
          key={ idx }
          value={ item.strCategory }
          onClick={ handleClick }
          data-Testid={ `${item.strCategory}-category-filter` }
          className="btn btn-secondary border-secondary rounded-0"
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
      className="btn btn-secondary border-secondary rounded-0"
    >
      All
    </button>
  );

  if (param.length < 1) return <h1>Loading...</h1>;

  return (
    <div className="d-flex justify-content-center flex-wrap mt-1">
      {/* <ButtonGroup toggle> */}
      { btns() }
      { btnAll() }
      {/* </ButtonGroup> */}
      {/* { btnAll() } */}
    </div>
  );
}

Categorias.propTypes = {
  param: array,
}.isRequired;

export default Categorias;
