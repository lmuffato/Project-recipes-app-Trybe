import { isEmpty, isString } from 'lodash';

function filterGarbageEntriesWithName(string) {
  return (arrayOfObjectEntries) => arrayOfObjectEntries
    .filter(([key]) => key.includes(string))
    .map(([key, value]) => (isString(value) ? [key, value] : [key, '']))
    .map(([key, value]) => ((value === ' ') ? [key, ''] : [key, value]))
    .filter(([, value]) => !isEmpty(value))
    .map(([, value]) => value);
}
const filterIngredientes = filterGarbageEntriesWithName('strIngredient');
const filterMeasurements = filterGarbageEntriesWithName('strMeasure');

export function createIngredientsList(object = {}) {
  const entries = Object.entries(object);
  const measurements = filterMeasurements(entries);
  const ingredients = filterIngredientes(entries);

  const zipTheArraysTogether = ingredients.reduce((acc, cur, index) => ([
    ...acc,
    [cur, measurements[index] || ''],
  ]), []);
  return zipTheArraysTogether;
}

export default createIngredientsList;
