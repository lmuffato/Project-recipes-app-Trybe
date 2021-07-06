const formattingMeasuresAndIngredients = (keysAndValues) => {
  const mapingValues = keysAndValues.reduce((acc, cur) => {
    const objeto = acc;
    const [key, value] = cur;

    if (key.includes('strIngredient') && value) {
      objeto.ingredients.push(value);
    }
    if (key.includes('strMeasure') && value) {
      objeto.measures.push(value);
    }
    // console.log(objeto);
    return objeto;
  }, {
    ingredients: [],
    measures: [],
  });
  return mapingValues;
};

export default formattingMeasuresAndIngredients;
