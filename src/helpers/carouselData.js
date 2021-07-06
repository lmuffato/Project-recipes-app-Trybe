const carouselImages = [];

export const formattingCarouselImgs = (recipe) => {
  const recipeName = 'strMeal' || 'strDrink';
  const recipeCategory = 'strCategory' || 'strAlcoholic';
  const recipeThumb = 'strMealThumb' || 'strDrinkThumb';
  // const objt = {
  //   recipeImg: '',
  //   recipeTitle: '',
  //   recipeCat: '',
  // };
  // const carrImages = [];
  // let key;
  return recipe.reduce((acc, curr) => {
    const objeto = acc;
    const [key, value] = curr;
    if (key === recipeName) {
      objeto.recipeTitle = value;
    }
    if (key === recipeCategory) {
      objeto.recipeCat = value;
    }
    if (key === recipeThumb) {
      objeto.recipeImg = value;
    }
    console.log(objeto);
  }, {
    recipeImg: '',
    recipeTitle: '',
    recipeCat: '',
  });
  // console.log(acc);
  // return acc;
  // return arrOfRecipes.forEach((acc, cur) => {
  //   const objeto = acc;
  //   const [key, value] = cur;

  //   if (key === recipeName) {
  //     objeto.recipeName = value;
  //   }
  //   if (key === recipeCategory) {
  //     objeto.recipeCategory = value;
  //   }
  //   if (key === recipeThumb) {
  //     objeto.recipeThumb = value;
  //   }
  //   console.log(objeto);
  //   return carouselImages.push(objeto);
  // }, {
  //   recipeName: '',
  //   recipeCategory: '',
  //   recipeThumb: '',
  // });
};

export default carouselImages;
// pra cada imagem, tenho um objeto com categoria, nome da receita e src da imagem
