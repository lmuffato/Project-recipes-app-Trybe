import mealsData from './mealsData';
import drinksData from './drinksData';

const paths = {
  comidas: '/comidas',
  bebidas: '/bebidas',
};

export default async function getRecipes(path, filterCategory) {
  switch (path) {
  case paths.comidas: {
    const results = await mealsData(filterCategory);
    return results;
  }

  case paths.bebidas: {
    const results = await drinksData(filterCategory);
    return results;
  }

  default:
    break;
  }
}
