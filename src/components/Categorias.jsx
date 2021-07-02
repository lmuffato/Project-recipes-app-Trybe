import React, { useContext } from 'react';
import { array } from 'prop-types';
import Buttons from './Buttons';
// import { filterCategoriaComidas, filterCategoriaBebidas }
//   from '../services/apisCategories';
import ContextComidas from '../provider/ContextComida';
import ContextBebidas from '../provider/ContextBebida';

function Categorias({ param }) {
  // const [string, setString] = useState('');
  const { setTexto: setComidas } = useContext(ContextComidas);
  const { setTexto: setBebidas } = useContext(ContextBebidas);

  const handleClick = ({ target }) => {
    // setString(target.innerText);
    setComidas(target.innerText);
    setBebidas(target.innerText);
  };

  // const getApis = async () => {
  //   const apiFoods = await filterCategoriaComidas(string);
  //   if (apiFoods !== null) {
  //     return setComidas(apiFoods);
  //   }
  //   const apiDrinks = await filterCategoriaBebidas(string);
  //   return setBebidas(apiDrinks);
  // };

  // useEffect(() => {
  //   if (string !== '') {
  //     getApis();
  //   }
  // }, [string]);

  const btns = () => param.map((item, index) => {
    const magicNumber = 4;
    let obj = '';
    if (index <= magicNumber) {
      const text = item.strCategory;
      const dataTestid = `${item.strCategory}-category-filter`;
      const funcHandleClick = handleClick;
      obj = { text, dataTestid, funcHandleClick };
      return <Buttons params={ obj } key={ item.strCategory } />;
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
      className="btn btn-success m-3 border border-success shadow p-3"
    >
      All
    </button>
  );

  if (param.length < 1) return <h1>Loading...</h1>;

  return (
    <div className="d-flex justify-content-center flex-wrap">
      { btns() }
      { btnAll() }
    </div>
  );
}

Categorias.propTypes = {
  param: array,
}.isRequired;

export default Categorias;
