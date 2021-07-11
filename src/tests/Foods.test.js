import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';
import meals from './helper/mocks/api/meals';

const {
  headerRenderTests,
  footerRenderTests,
  doTheLoginProcess,
} = getTest();

const { getByTestId, getByRole } = screen;

const mockFetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(meals),
}));

describe('Check Header and Footer components', () => {
  it('does Header and Footer tests', async () => {
    await renderWithRouterAndContext();

    doTheLoginProcess(getByTestId, userEvent);

    headerRenderTests().itRenderAllIcons(getByTestId);
    footerRenderTests().itRenderAllIcons(getByTestId);
  });
});

describe('API tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  global.fetch = mockFetch;

  it('checks API when it doesnt return anything', async () => {
    await renderWithRouterAndContext();

    doTheLoginProcess(getByTestId, userEvent);

    const searchIcon = getByRole('img', { name: /search/i });
    userEvent.click(searchIcon);

    const inputSearch = getByRole('textbox');
    const labelPrimeiraLetra = getByRole('radio', {
      name: /primeira letra/i,
    });
    const buttonSearch = getByRole('button', { name: /buscar/i });

    userEvent.type(inputSearch, '>');
    userEvent.click(labelPrimeiraLetra);
    userEvent.click(buttonSearch);

    const calledTimes = 2;
    expect(global.fetch).toBeCalledTimes(calledTimes);
  });

  it('checks API', async () => {
    await renderWithRouterAndContext();

    doTheLoginProcess(getByTestId, userEvent);

    const searchIcon = getByRole('img', { name: /search/i });
    userEvent.click(searchIcon);

    const inputSearch = getByRole('textbox');
    const labelRadioNome = getByRole('radio', { name: /ingrediente/i });
    const buttonSearch = getByRole('button', { name: /buscar/i });

    userEvent.type(inputSearch, 'Corba');
    userEvent.click(labelRadioNome);
    userEvent.click(buttonSearch);
  });
});

describe('Meals tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  global.fetch = mockFetch;

  // it('cheks initial foods', async () => {
  //   await renderWithRouterAndContext();

  //   doTheLoginProcess(getByTestId, userEvent);

  //   foodDataApi.firstTwelve.forEach((recipe) => {
  //     recipeCardsTest(recipe, findByTestId);
  //   });
  // });
});
