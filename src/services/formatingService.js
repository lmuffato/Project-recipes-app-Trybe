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

// preciso de um loop pra fazer a verificação num array de receitas
// funfou
export const formattingCarouselImages = (keysAndValues) => {
  const mappingImagesURLAndRecipeNames = keysAndValues.reduce((acc, cur) => {
    const objeto = acc;
    const [key, value] = cur;

    if (key.includes('strMealThumb') && value) {
      objeto.mealUrls.push(value);
    }
    if (key === 'strMeal' && value) {
      objeto.mealNames.push(value);
    }
    if (key.includes('strDrinkThumb') && value) {
      objeto.drinkUrls.push(value);
    }
    if (key === 'strDrink' && value) {
      objeto.drinkNames.push(value);
    }
    if (key.includes('idMeal') && value) {
      objeto.mealIds.push(value);
    }
    if (key.includes('idDrink') && value) {
      objeto.drinkIds.push(value);
    }
    console.log(objeto);
    return objeto;
  }, {
    mealUrls: [], // imgs das refeições
    mealIds: [], // ids das comidas
    mealNames: [], // nomes das refeições
    drinkUrls: [], // url das imgs dos drinks
    drinkNames: [], // array de nomes dos drinks
    drinkIds: [], // ids das bebidas
  });
  return mappingImagesURLAndRecipeNames;
};
