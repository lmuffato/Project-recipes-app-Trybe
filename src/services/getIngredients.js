const getFoodIngredientsImgs = async (ingredients) => {
  const toReturn = ingredients.map((ingredient) => {
    const { strIngredient } = ingredient;
    return ({
      name: strIngredient,
      imgSrc: `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`,
    });
  });
  return toReturn;
};

const getDrinkIngredientsImgs = async (ingredients) => {
  const toReturn = ingredients.map((ingredient) => {
    const { strIngredient1 } = ingredient;
    return ({
      name: strIngredient1,
      imgSrc: `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`,
    });
  });
  return toReturn;
};

export const getDrinkIngredients = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(endPoint);
  const data = await response.json();
  const { drinks } = data;
  const toReturn = getDrinkIngredientsImgs(drinks);
  return toReturn;
};

export const getFoodIngredients = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(endPoint);
  const data = await response.json();
  const { meals } = data;
  const toReturn = getFoodIngredientsImgs(meals);
  return toReturn;
};
