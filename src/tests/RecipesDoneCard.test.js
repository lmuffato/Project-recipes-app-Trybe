import React from 'react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import renderWithRouter from './renderWithRouter';
import RecipesDoneCard from '../components/RecipesDoneCard';

jest.mock('clipboard-copy');

const nameTestId = '0-horizontal-name';
const copyButtonTestId = '0-horizontal-share-btn';

describe('tests the component', () => {
  const mockFood = {
    type: 'comida',
    image: 'teste',
    name: 'teste',
    area: 'italia',
    tags: ['teste', 'teste3'],
    doneDate: '10/10',
    id: '1234',
  };
  const mockDrink = {
    type: 'bebida',
    image: 'teste',
    name: 'teste',
    area: 'italia',
    id: '1234',
  };
  it('tests the rendering of food', () => {
    const {
      getByTestId,
    } = renderWithRouter(<RecipesDoneCard recipe={ mockFood } index="0" />);
    const name = getByTestId(nameTestId);
    expect(name).toBeInTheDocument();
    const image = getByTestId('0-horizontal-image');
    expect(image).toBeInTheDocument();
    const area = getByTestId('0-horizontal-top-text');
    expect(area).toBeInTheDocument();
    const date = getByTestId('0-horizontal-done-date');
    expect(date).toBeInTheDocument();
    const tag = getByTestId('0-teste3-horizontal-tag');
    expect(tag).toBeInTheDocument();
    const copyButton = getByTestId(copyButtonTestId);
    expect(copyButton).toBeInTheDocument();
  });
  it('tests the drink rendering', () => {
    const {
      getByTestId,
    } = renderWithRouter(<RecipesDoneCard recipe={ mockDrink } index="0" />);
    const name = getByTestId(nameTestId);
    expect(name).toBeInTheDocument();
    const image = getByTestId('0-horizontal-image');
    expect(image).toBeInTheDocument();
    const area = getByTestId('0-horizontal-top-text');
    expect(area).toBeInTheDocument();
    const date = getByTestId('0-horizontal-done-date');
    expect(date).toBeInTheDocument();
    const copyButton = getByTestId(copyButtonTestId);
    expect(copyButton).toBeInTheDocument();
  });
  it('tests the link and copy button of foods', async () => {
    const {
      getByTestId,
      findByText,
      history,
    } = renderWithRouter(<RecipesDoneCard recipe={ mockFood } index="0" />);
    const name = getByTestId(nameTestId);
    userEvent.click(name);
    const path = history.location.pathname;
    expect(path).toBe('/comidas/1234');
    const copyButton = getByTestId(copyButtonTestId);
    userEvent.click(copyButton);
    const copytext = await findByText('Link copiado!');
    expect(copytext).toBeInTheDocument();
    expect(copy).toHaveBeenCalled();
  });
  it('tests the link and copy button of drinks', async () => {
    const {
      getByTestId,
      findByText,
      history,
    } = renderWithRouter(<RecipesDoneCard recipe={ mockDrink } index="0" />);
    const name = getByTestId(nameTestId);
    userEvent.click(name);
    const path = history.location.pathname;
    expect(path).toBe('/bebidas/1234');
    const copyButton = getByTestId(copyButtonTestId);
    userEvent.click(copyButton);
    const copytext = await findByText('Link copiado!');
    expect(copytext).toBeInTheDocument();
    expect(copy).toHaveBeenCalled();
  });
});
