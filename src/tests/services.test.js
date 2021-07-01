import fetchMeals from '../services/fetchMeals';

test('test', async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const data = {
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

  global.fetch = jest.fn(() => (
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  ));

  const fetch = await fetchMeals();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toBeCalledWith(endpoint);
  expect(fetch.length).toBe(2);
});
