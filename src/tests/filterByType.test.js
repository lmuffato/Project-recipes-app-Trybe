import filterRecipesByType from '../utils/filterRecipesByType';

const mockedRecipes = [
  {
    id: '52771',
    type: 'comida',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
  },
  {
    id: '178319',
    type: 'bebida',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
  },
];

describe('Testa função acessória filterRecipesByType', () => {
  it('Filtra comidas', () => {
    expect(filterRecipesByType(mockedRecipes, 'Food')).toEqual([
      {
        id: '52771',
        type: 'comida',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
      }]);
    expect(filterRecipesByType(mockedRecipes, 'Food').length).toBe(1);
  });

  it('Filtra bebidas', () => {
    expect(filterRecipesByType(mockedRecipes, 'Drinks')).toEqual([
      {
        id: '178319',
        type: 'bebida',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
      }]);
    expect(filterRecipesByType(mockedRecipes, 'Drinks').length).toBe(1);
  });

  it('Sem filtros', () => {
    expect(filterRecipesByType(mockedRecipes, 'All')).toEqual(mockedRecipes);
    expect(filterRecipesByType(mockedRecipes, 'All').length).toBe(2);
  });
});
