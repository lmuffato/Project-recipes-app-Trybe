import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const { getByTestId, getByRole } = screen;
const { doTheLoginProcess, testsIds } = getTest();
const { footerTestIds } = testsIds;

describe('Requirement 19', () => {
  it('renders footer', () => {
    renderWithRouterAndContext();
    doTheLoginProcess(getByTestId, userEvent);

    const footer = getByTestId(footerTestIds.footer);
    expect(footer).toBeInTheDocument();
  });

  it('renders Drinks Botton Button', () => {
    renderWithRouterAndContext();
    doTheLoginProcess(getByTestId, userEvent);

    const drinkBottonButton = getByTestId(footerTestIds.drinksBottonBtn);
    expect(drinkBottonButton).toBeInTheDocument();
  });

  it('renders Explore Button', () => {
    renderWithRouterAndContext();
    doTheLoginProcess(getByTestId, userEvent);

    const exploreButton = getByTestId(footerTestIds.exploreBottonBtn);
    expect(exploreButton).toBeInTheDocument();
  });

  it('renders Drinks Botton Button', () => {
    renderWithRouterAndContext();
    doTheLoginProcess(getByTestId, userEvent);

    const foodBottonButton = getByTestId(footerTestIds.foodBottonBtn);
    expect(foodBottonButton).toBeInTheDocument();
  });
});

describe('Requirement 20', () => {
  it('expect Footer position to be fixed', () => {
    renderWithRouterAndContext();
    doTheLoginProcess(getByTestId, userEvent);

    const footer = getByTestId(footerTestIds.footer);
    expect(footer.style.bottom).toBe('0px');
    expect(footer.style.position).toBe('fixed');
  });
  it('expect Footer icons src to match', () => {
    renderWithRouterAndContext();
    doTheLoginProcess(getByTestId, userEvent);

    const drinkIcon = getByTestId(footerTestIds.drinkIcon);
    expect(drinkIcon.src).toBe('http://localhost/drinkIcon.svg');
    const exploreIcon = getByTestId(footerTestIds.exploreIcon);
    expect(exploreIcon.src).toBe('http://localhost/exploreIcon.svg');
    const mealIcon = getByTestId(footerTestIds.mealIcon);
    expect(mealIcon.src).toBe('http://localhost/mealIcon.svg');
  });
});

describe('Requirement 22', () => {
  it('changes to Cocktails page', () => {
    renderWithRouterAndContext();
    doTheLoginProcess(getByTestId, userEvent);

    const cocktailBtn = getByRole('button', {
      name: /drink/i,
    });
    userEvent.click(cocktailBtn);
  });
});

describe('Requirement 23', () => {
  it('changes to Explore page', () => {
    renderWithRouterAndContext();
    doTheLoginProcess(getByTestId, userEvent);

    const exploreBtn = getByRole('button', {
      name: /explore/i,
    });
    userEvent.click(exploreBtn);
  });
});

describe('Requirement 24', () => {
  it('change to Foods page', () => {
    renderWithRouterAndContext();
    doTheLoginProcess(getByTestId, userEvent);

    const foodBtn = getByRole('button', {
      name: /food/i,
    });
    userEvent.click(foodBtn);
  });
});
