const formattingMeasuresAndIngredients = (type, keysAndValues) => {
  const mapingValues = keysAndValues.reduce((acc, cur) => {
    const objeto = acc;
    const currentItem = cur;
    switch (type) {
    case 'meals':
      if (currentItem[0].includes('strIngredient') && currentItem[1] !== '') {
        objeto.ingredients.push(currentItem[1]);
      }
      if (currentItem[0].includes('strMeasure') && currentItem[1] !== '') {
        objeto.measures.push(currentItem[1]);
      }
      break;
    default:
      if (currentItem[0].includes('strIngredient') && currentItem[1] !== null) {
        objeto.ingredients.push(currentItem[1]);
      }
      if (currentItem[0].includes('strMeasure') && currentItem[1] !== null) {
        objeto.measures.push(currentItem[1]);
      }
    }
    console.log(objeto);
    return objeto;
  }, {
    ingredients: [],
    measures: [],
  });
  return mapingValues;
};

export default formattingMeasuresAndIngredients;
