import { isEmpty, isString, zip } from 'lodash';

export function createIngredientsList(object = {}) {
  const entries = Object.entries(object);
  const ingredients = entries
    .filter(([key]) => key.includes('strIngredient'))
    .filter(([, value]) => isString(value) && !isEmpty(value))
    .map(([, value]) => value);
  const measurements = entries
    .filter(([key]) => key.includes('strMeasure'))
    .filter(([, value]) => isString(value) && !isEmpty(value))
    .map(([, value]) => value);
  return zip(ingredients, measurements);
}

export default createIngredientsList;
