import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';
import { foodDataApi } from './helper/mocks/data';
import renderWithRCA from './helper/renders/renderWithRouterAndContextAPI';

const {
  headerRenderTests,
  footerRenderTests,
  doTheLoginProcess,
  recipeCardsTest,
} = getTest();

const { getByTestId, getByRole } = screen;

describe('Check Header and Footer components', () => {
  it('does Header and Footer tests', async () => {
    await renderWithRouterAndContext();

    doTheLoginProcess(getByTestId, userEvent);

    headerRenderTests().itRenderAllIcons(getByTestId);
    footerRenderTests().itRenderAllIcons(getByTestId);
  });
});

describe('API tests', () => {
  it('checks API when it doesnt return anything', async () => {
    renderWithRCA();

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
    renderWithRCA();

    doTheLoginProcess(getByTestId, userEvent);

    const searchIcon = getByRole('img', { name: /search/i });
    userEvent.click(searchIcon);

    const inputSearch = getByRole('textbox');
    const labelRadioNome = getByRole('radio', { name: /nome/i });
    const buttonSearch = getByRole('button', { name: /buscar/i });

    userEvent.type(inputSearch, 'Corba');
    userEvent.click(labelRadioNome);
    userEvent.click(buttonSearch);
  });
});

describe('Meals tests', () => {
  it('cheks initial foods', async () => {
    const { findByTestId } = renderWithRCA();

    doTheLoginProcess(getByTestId, userEvent);

    foodDataApi.firstTwelve.forEach((recipe) => {
      recipeCardsTest(recipe, findByTestId);
    });
  });

  it('checks buttons category', async () => {
    const { findByTestId } = renderWithRCA();
    doTheLoginProcess(getByTestId, userEvent);

    const sectionCorba = await findByTestId('0-recipe-card');
    expect(sectionCorba.firstChild).toHaveTextContent('Corba');
    const beefButton = await findByTestId('Beef-category-filter');
    const breakfastButton = await findByTestId('Breakfast-category-filter');
    const chickenButton = await findByTestId('Chicken-category-filter');
    expect(beefButton).toHaveTextContent('Beef');
    expect(breakfastButton).toHaveTextContent('Breakfast');
    expect(chickenButton).toHaveTextContent('Chicken');
    userEvent.click(beefButton);
    userEvent.click(breakfastButton);
    userEvent.click(chickenButton);
  });
});
