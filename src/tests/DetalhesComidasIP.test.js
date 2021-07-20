import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

const PAGE_MOCK = '/comidas/52978/in-progress';

describe('Teste da página de Comidas In Progress', () => {
  test('A tela de comidas in-progress possui os elementos corretos', () => {
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

  test('A tela de comidas in-progress possui os ingredientes corretos', async () => {
    const {
      getByTestId,
      findAllByTestId,
      getByRole,
      history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    expect(getByRole('heading', { name: 'Ingredients', level: 3 })).toBeInTheDocument();

    const ingredientRegEx = /.-ingredient-step/;
    const AMOUNT_OF_INGREDIENTS = 6;

    const ingredients = await findAllByTestId(ingredientRegEx);
    expect(ingredients).toHaveLength(AMOUNT_OF_INGREDIENTS);

    ingredients.forEach((ingredient) => {
      expect(ingredient).toBeInTheDocument();
    });
  });

  test('A tela de comidas in-progress possui as instruções corretas', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    expect(getByTestId('instructions')).toBeInTheDocument();
  });

  test('Finalizar está habilitado se os ingredientes estão marcados', async () => {
    const { getByTestId, findAllByRole, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    const finishRecipeBtn = getByTestId('finish-recipe-btn');

    expect(finishRecipeBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toHaveProperty('disabled');

    const ingredientCheckbox = await findAllByRole('checkbox');
    ingredientCheckbox.forEach((ing) => {
      userEvent.click(ing);
    });

    expect(finishRecipeBtn).not.toBeDisabled();

    userEvent.click(finishRecipeBtn);

    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  test('Um ingrediente pode ser desmarcado', async () => {
    const { getByTestId, findAllByRole, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    const finishRecipeBtn = getByTestId('finish-recipe-btn');

    expect(finishRecipeBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toHaveProperty('disabled');

    const ingredientCheckbox = await findAllByRole('checkbox');
    ingredientCheckbox.forEach((ing) => {
      userEvent.click(ing);
    });

    userEvent.click(ingredientCheckbox[0]);

    expect(finishRecipeBtn).toBeDisabled();
  });
});
