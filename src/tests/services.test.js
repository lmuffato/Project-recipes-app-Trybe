import fetchDrinks from '../services/fetchDrinks';
import fetchMeals from '../services/fetchMeals';

const mealsData = {
  meals: [
    {
      strMeal: 'Corba',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strMeal: 'Kumpir',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
    },
  ],
};

const drinksData = {
  drinks: [
    {
      strDrink: 'GG',
      strDrinkThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strDrink: 'A1',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    }],
};

describe('Test API fetchs', () => {
  it('Test fetchMeals function', async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.resolve(mealsData),
      })
    ));

    const fetch = await fetchMeals();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith(endpoint);
    expect(fetch.length).toBe(2);
  });

  it('Test fetchDrinks functions', async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.resolve(drinksData),
      })
    ));

    const fetch = await fetchDrinks();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith(endpoint);
    expect(fetch.length).toBe(2);
  });
});
