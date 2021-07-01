import React, { useState, useEffect, useContext } from 'react';
import { array } from 'prop-types';
import Buttons from './Buttons';
import { filterCategoriaComidas, filterCategoriaBebidas }
  from '../services/apisCategories';
import ContextComidas from '../provider/ContextComida';
import ContextBebidas from '../provider/ContextBebida';

function Categorias({ param }) {
  const [string, setString] = useState('');
  const { setData: setComidas } = useContext(ContextComidas);
  const { setData: setBebidas } = useContext(ContextBebidas);

  const handleClick = ({ target }) => {
    setString(target.innerText);
  };

  const getApis = async () => {
    const apiFoods = await filterCategoriaComidas(string);
    if (apiFoods !== null) {
      return setComidas(apiFoods);
    }
    const apiDrinks = await filterCategoriaBebidas(string);
    return setBebidas(apiDrinks);
  };

  useEffect(() => {
    if (string !== '') {
      getApis();
    }
  }, [string]);

  // eslint-disable-next-line array-callback-return
  const btns = () => param.map((item, index) => {
    const magicNumber = 4;
    if (index <= magicNumber) {
      const text = item.strCategory;
      const dataTestid = `${item.strCategory}-category-filter`;
      const funcHandleClick = handleClick;
      const obj = { text, dataTestid, funcHandleClick };

      return <Buttons params={ obj } key={ item.strCategory } />;
    }
  });

  if (param.length < 1) return <h1>Loading...</h1>;

  return (
    <div>
      { btns() }
    </div>
  );
}

Categorias.propTypes = {
  param: array,
}.isRequired;

export default Categorias;
