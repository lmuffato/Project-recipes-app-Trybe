const formattingMeasuresAndIngredients = (keysAndValues) => {
  const mapingValues = keysAndValues.reduce((acc, cur) => {
    const objeto = acc;
    const currentItem = cur;

    if (currentItem[0].includes('strIngredient') && currentItem[1]) {
      objeto.ingredients.push(currentItem[1]);
    }
    if (currentItem[0].includes('strMeasure') && currentItem[1]) {
      objeto.measures.push(currentItem[1]);
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
