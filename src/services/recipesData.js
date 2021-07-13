import { mealsData, exploreMealsData } from './mealsData';
import { drinksData, exploreDrinksData } from './drinksData';

const paths = {
  comidas: '/comidas',
  bebidas: '/bebidas',
  explorarComidas: '/explorar/comidas',
  explorarBebidas: '/explorar/bebidas',
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
  case paths.explorarComidas: {
    const results = await exploreMealsData();
    return results;
  }

  case paths.explorarBebidas: {
    const results = await exploreDrinksData();
    return results;
  }

  default:
    break;
  }
}
