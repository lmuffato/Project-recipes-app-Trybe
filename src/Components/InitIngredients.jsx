const InitIngredients = (currentProduct, page) => {
  const initIngredients = [];
  let length = 0;
  const lengthMeal = 20;
  const lengthDrink = 15;
  if (page === 'comidas') length = lengthMeal;
  if (page === 'bebidas') length = lengthDrink;
  for (let i = 1; i <= length; i += 1) {
    currentProduct.forEach((elem) => {
      if (elem[`strIngredient${i}`] !== null || elem[`strMeasure${i}`] !== null) {
        initIngredients
          .push(`${elem[`strIngredient${i}`]} - ${elem[`strMeasure${i}`]}`);
      }
    });
  }
  return initIngredients;
};

export default InitIngredients;
