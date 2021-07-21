import { waitForElement, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';

const RECIPE_TITLE_TEST_ID = 'recipe-title';
const FIRST_IMAGE_TEST_ID = '0-card-img';
const FIRST_INGREDIENT = '0-ingredient-name-and-measure';
const BEEF_FILTER = 'Beef-category-filter';
const ORDINARY_DRINK_FILTER = 'Ordinary Drink-category-filter';
describe('Testes de rotas do App', () => {
  it('Rota /explorar/bebidas/ingredientes renderiza corretamente',
    async () => {
      const { getByText, getByTestId } = await renderWithRouterHooksAndProvider(
        <App />,
        '/explorar/bebidas/ingredientes',
      );
      await waitForElement(() => getByTestId(FIRST_IMAGE_TEST_ID));
      await waitForElement(() => getByText('Light rum'));
      expect(getByTestId(FIRST_IMAGE_TEST_ID)).toBeInTheDocument();
      expect(getByText('Light rum')).toBeInTheDocument();

      fireEvent.click(getByText('Light rum'));
      await waitForElement(() => getByText('151 Florida Bushwacker'));
      expect(getByText('151 Florida Bushwacker')).toBeInTheDocument();
      expect(getByTestId(FIRST_IMAGE_TEST_ID).src).toMatch(
        'https://www.thecocktaildb.com/images/media/drink/rvwrvv1468877323.jpg',
      );
    });

  it('Rota /explorar/comidas/ingredientes renderiza corretamente',
    async () => {
      const { getByText, getByTestId } = await renderWithRouterHooksAndProvider(
        <App />,
        '/explorar/comidas/ingredientes',
      );

      await waitForElement(() => getByTestId(FIRST_IMAGE_TEST_ID));
      expect(getByTestId(FIRST_IMAGE_TEST_ID)).toBeInTheDocument();
      expect(getByText('Chicken')).toBeInTheDocument();
      expect(getByTestId('1-card-img')).toBeInTheDocument();
      expect(getByText('Salmon')).toBeInTheDocument();

      fireEvent.click(getByText('Chicken'));
      await waitForElement(() => getByText('Brown Stew Chicken'));
      expect(getByText('Brown Stew Chicken')).toBeInTheDocument();
      expect(getByTestId(FIRST_IMAGE_TEST_ID).src).toMatch(
        'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
      );
    });

  it('Rota /comidas/:id renderiza corretamente',
    async () => {
      const {
        getByText,
        getByTestId,
        getAllByTestId,
      } = await renderWithRouterHooksAndProvider(
        <App />,
        '/comidas/52940',
      );

      await waitForElement(() => getByTestId(RECIPE_TITLE_TEST_ID));
      expect(getByTestId(RECIPE_TITLE_TEST_ID)).toBeInTheDocument();
      expect(getByTestId('recipe-category')).toBeInTheDocument();
      expect(getByText('Recomendadas')).toBeInTheDocument();
      expect(getAllByTestId(FIRST_INGREDIENT)[0]).toBeInTheDocument();
      expect(getAllByTestId(FIRST_INGREDIENT)[1]).toBeInTheDocument();
      expect(getAllByTestId('1-ingredient-name-and-measure')[0]).toBeInTheDocument();
      expect(getAllByTestId('2-ingredient-name-and-measure')[0]).toBeInTheDocument();
      expect(getAllByTestId('12-ingredient-name-and-measure')[0]).toBeInTheDocument();
      expect(getAllByTestId('12-ingredient-name-and-measure')[1]).toBeInTheDocument();
    });

  it('Rota /bebidas/:id renderiza corretamente',
    async () => {
      const {
        getByText, getByTestId, getAllByTestId,
      } = await renderWithRouterHooksAndProvider(
        <App />,
        '/bebidas/15997',
      );

      await waitForElement(() => getByTestId('recipe-photo'));

      expect(getByTestId('recipe-photo')).toBeInTheDocument();
      expect(getByTestId(RECIPE_TITLE_TEST_ID)).toBeInTheDocument();
      expect(getByTestId('recipe-category')).toBeInTheDocument();
      expect(getByText('Recomendadas')).toBeInTheDocument();

      expect(getAllByTestId(FIRST_INGREDIENT)[0]).toBeInTheDocument();
      expect(getAllByTestId(FIRST_INGREDIENT)[1]).toBeInTheDocument();
      expect(getAllByTestId('1-ingredient-name-and-measure')[0]).toBeInTheDocument();
      expect(getAllByTestId('2-ingredient-name-and-measure')[0]).toBeInTheDocument();
    });

  it('Rota explorar comidas por area renderiza corretamente',
    async () => {
      const { getByText, getByTestId } = await renderWithRouterHooksAndProvider(
        <App />,
        '/explorar/comidas/area',
      );

      const EXPLORE_DROPDOWN = 'explore-by-area-dropdown';

      await waitForElement(() => getByTestId(FIRST_IMAGE_TEST_ID));
      await waitForElement(() => getByTestId(EXPLORE_DROPDOWN));

      expect(getByTestId(FIRST_IMAGE_TEST_ID)).toBeInTheDocument();
      expect(getByText('Corba')).toBeInTheDocument();
      expect(getByText('Kumpir')).toBeInTheDocument();
      expect(getByText('Tamiya')).toBeInTheDocument();
      expect(getByTestId(EXPLORE_DROPDOWN)).toBeInTheDocument();
      expect(getByTestId('American-option')).toBeInTheDocument();
      expect(getByTestId('British-option')).toBeInTheDocument();
      expect(getByTestId('Canadian-option')).toBeInTheDocument();

      fireEvent.change(getByTestId(EXPLORE_DROPDOWN), {
        target: { value: 'Chinese' },
      });
      await waitForElement(() => getByText('Beef Lo Mein'));
      expect(getByText('Beef Lo Mein')).toBeInTheDocument();
      expect(getByTestId(FIRST_IMAGE_TEST_ID).src).toMatch(
        'https://www.themealdb.com/images/media/meals/1529444830.jpg',
      );
      expect(getByText('Chicken Congee')).toBeInTheDocument();
      expect(getByText('Egg Drop Soup')).toBeInTheDocument();
    });

  it('Rota /comidas',
    async () => {
      const { getByText, getByTestId } = await renderWithRouterHooksAndProvider(
        <App />,
        '/comidas',
      );

      // await waitForElement(() => getByTestId('explore-by-area-dropdown'));
      await waitForElement(() => getByText('Corba'));
      await waitForElement(() => getByTestId(BEEF_FILTER));
      expect(getByText('Corba')).toBeInTheDocument();
      expect(getByText('Kumpir')).toBeInTheDocument();
      expect(getByTestId(BEEF_FILTER)).toBeInTheDocument();
      expect(getByTestId('Breakfast-category-filter')).toBeInTheDocument();
      expect(getByTestId('Chicken-category-filter')).toBeInTheDocument();

      fireEvent.click(getByTestId(BEEF_FILTER));
      await waitForElement(() => getByText('Beef and Mustard Pie'));
      expect(getByText('Beef and Mustard Pie')).toBeInTheDocument();
      expect(getByTestId(FIRST_IMAGE_TEST_ID).src).toMatch(
        'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
      );
      expect(getByText('Beef and Oyster pie')).toBeInTheDocument();

      fireEvent.click(getByTestId('All-category-filter'));
      await waitForElement(() => getByText('Corba'));
      expect(getByText('Dal fry')).toBeInTheDocument();
      expect(getByText('Lasagne')).toBeInTheDocument();
    });

  it('Rota /bebidas',
    async () => {
      const { getByText, getByTestId } = await renderWithRouterHooksAndProvider(
        <App />,
        '/bebidas',
      );

      await waitForElement(() => getByText('GG'));
      await waitForElement(() => getByTestId(ORDINARY_DRINK_FILTER));
      expect(getByText('GG')).toBeInTheDocument();
      expect(getByText('A1')).toBeInTheDocument();
      expect(getByTestId(ORDINARY_DRINK_FILTER)).toBeInTheDocument();
      expect(getByTestId('Cocktail-category-filter')).toBeInTheDocument();

      fireEvent.click(getByTestId(ORDINARY_DRINK_FILTER));
      await waitForElement(() => getByText('3-Mile Long Island Iced Tea'));
      expect(getByText('3-Mile Long Island Iced Tea')).toBeInTheDocument();
      expect(getByTestId('0-card-img').src).toMatch(
        'https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg',
      );
      expect(getByText('410 Gone')).toBeInTheDocument();

      fireEvent.click(getByTestId('All-category-filter'));
      await waitForElement(() => getByText('GG'));
      expect(getByText('ABC')).toBeInTheDocument();
      expect(getByText('747')).toBeInTheDocument();
    });

  it('Receita de comida em progresso',
    async () => {
      const { getByText, getByTestId } = await renderWithRouterHooksAndProvider(
        <App />,
        '/comidas/52977',
      );

      const FINISH_BTN = 'finish-recipe-btn';

      await waitForElement(() => getByTestId(RECIPE_TITLE_TEST_ID));
      expect(getByText('Corba')).toBeInTheDocument();
      const startRecipeBtn = getByTestId('start-recipe-btn');
      expect(startRecipeBtn).toBeInTheDocument();

      fireEvent.click(startRecipeBtn);
      await waitForElement(() => getByTestId(FINISH_BTN));
      expect(getByTestId(FINISH_BTN)).toBeInTheDocument();
      // toBeDisabled consultado no stackOverflow
      // https://stackoverflow.com/questions/56593840/check-that-button-is-disabled-in-react-testing-library
      expect(getByTestId(FINISH_BTN)).toBeDisabled();

      const TOTAL_INGREDIENTS = 12;
      for (let index = 0; index <= TOTAL_INGREDIENTS; index += 1) {
        fireEvent.click(getByTestId(`${index}-ingredient-step`));
      }

      expect(getByTestId(FINISH_BTN)).not.toBeDisabled();
      fireEvent.click(getByTestId(FINISH_BTN));
      await waitForElement(() => getByTestId('page-title'));
      expect(getByText('Receitas Feitas')).toBeInTheDocument();
    });

  it('Receita de bebida em progresso',
    async () => {
      const { getByText, getByTestId } = await renderWithRouterHooksAndProvider(
        <App />,
        '/bebidas/15997',
      );

      const FINISH_BTN = 'finish-recipe-btn';
      await waitForElement(() => getByTestId(RECIPE_TITLE_TEST_ID));
      expect(getByText('GG')).toBeInTheDocument();
      const startRecipeBtn = getByTestId('start-recipe-btn');
      expect(startRecipeBtn).toBeInTheDocument();

      fireEvent.click(startRecipeBtn);
      await waitForElement(() => getByTestId(FINISH_BTN));
      expect(getByTestId(FINISH_BTN)).toBeInTheDocument();
      // toBeDisabled consultado no stackOverflow
      // https://stackoverflow.com/questions/56593840/check-that-button-is-disabled-in-react-testing-library
      expect(getByTestId(FINISH_BTN)).toBeDisabled();
      const TOTAL_INGREDIENTS = 2;
      for (let index = 0; index <= TOTAL_INGREDIENTS; index += 1) {
        fireEvent.click(getByTestId(`${index}-ingredient-step`));
      }

      expect(getByTestId(FINISH_BTN)).not.toBeDisabled();
      fireEvent.click(getByTestId(FINISH_BTN));
      await waitForElement(() => getByTestId('page-title'));
      expect(getByText('Receitas Feitas')).toBeInTheDocument();
    });
});
