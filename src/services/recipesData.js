import mealsData from './mealsData';
import drinksData from './drinksData';

const paths = {
  comidas: '/comidas',
  bebidas: '/bebidas',
};

export default async function getRecipes(path, options) {
  switch (path) {
  case paths.comidas: {
    const results = await mealsData(options);
    return results;
  }

  case paths.bebidas: {
    const results = await drinksData(options);
    return results;
  }

  default:
    break;
  }
}
