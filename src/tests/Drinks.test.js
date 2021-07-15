import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';
import renderWithRCA from './helper/renders/renderWithRouterAndContextAPI';
import { drinkDataApi } from './helper/mocks/data';

const {
  headerRenderTests,
  footerRenderTests,
  doTheLoginProcess,
  recipeCardsTest,
} = getTest();

const { getByTestId, getByRole } = screen;

const goToTheDrinkMainPage = () => {
  doTheLoginProcess(getByTestId, userEvent);
  userEvent.click(getByTestId('drinks-bottom-btn'));
};

describe('Check Header and Footer components', () => {
  it('does Header and Footer tests', async () => {
    await renderWithRouterAndContext();

    goToTheDrinkMainPage();

    headerRenderTests().itRenderAllIcons(getByTestId);
    footerRenderTests().itRenderAllIcons(getByTestId);
  });
});

describe('API tests', () => {
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

describe('Drinks tests', () => {
  it('cheks initial foods', async () => {
    const { findByTestId, history } = renderWithRCA();
    goToTheDrinkMainPage();

    expect(history.location.pathname).toBe('/bebidas');

    drinkDataApi.firstTwelve.forEach((recipe) => {
      recipeCardsTest(recipe, findByTestId);
    });
  });

  it('checks Recipe Card', async () => {
    const { findByTestId } = renderWithRCA();
    goToTheDrinkMainPage();

    const sectionGG = await findByTestId('0-recipe-card');
    userEvent.click(sectionGG);
  });
});
