import fetchMeals from '../services/fetchMeals';

test('test', async () => {
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
  expect(fetch.length).toBe(2);
});
