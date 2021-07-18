import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

const PAGE_MOCK = '/comidas/52948';

describe('Teste página de detalhes de uma comida', () => {
  test('A tela de detalhes de uma comida possui os itens corretos', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    expect(getByTestId('recipe-photo')).toBeInTheDocument();
    expect(getByTestId('recipe-title')).toBeInTheDocument();
    expect(getByTestId('recipe-category')).toBeInTheDocument();

    expect(getByTestId('share-btn')).toBeInTheDocument();
    expect(getByTestId('favorite-btn')).toBeInTheDocument();
  });

  test('A tela de detalhes possui os ingredientes corretos', async () => {
    const {
      getByTestId,
      findAllByTestId,
      getByRole,
      history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    expect(getByRole('heading', { name: 'Ingredients', level: 2 })).toBeInTheDocument();

    const ingredientRegEx = /.-ingredient-name-and-measure/;
    const AMOUNT_OF_INGREDIENTS = 11;

    const ingredients = await findAllByTestId(ingredientRegEx);
    expect(ingredients).toHaveLength(AMOUNT_OF_INGREDIENTS);

    ingredients.forEach((ingredient) => {
      expect(ingredient).toBeInTheDocument();
    });
  });

  test('A tela de detalhes possui as instruções corretas', async () => {
    const { getByTestId, findByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    const instructions = await findByTestId('instructions');

    expect(instructions).toBeInTheDocument();
  });

  test('Vai para a tela in-progress ao clicar no botão', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    const startRecipeBtn = getByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();

    userEvent.click(startRecipeBtn);

    expect(history.location.pathname).toBe(`${PAGE_MOCK}/in-progress`);
  });

  test('Carousel é renderizado corretamente', async () => {
    const {
      getByTestId,
      findAllByTestId,
      history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    const carouselRegEx = /.-recomendation-card/;
    const AMOUNT_OF_CARDS = 6;

    const carouselCards = await findAllByTestId(carouselRegEx);
    expect(carouselCards).toHaveLength(AMOUNT_OF_CARDS);

    carouselCards.forEach((card) => {
      expect(card).toBeInTheDocument();
    });
  });
});
