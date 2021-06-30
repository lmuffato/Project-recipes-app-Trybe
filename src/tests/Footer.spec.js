import React from 'react';
import renderWithRouter from './renderWithRouter';
import Footer from '../compenents/Footer';

describe('Test the component Footer', () => {
  const iconArray = [
    {
      icon: 'drinkIcon',
      dataTest: 'drinks-bottom-btn',
    },
    {
      icon: 'exploreIcon',
      dataTest: 'explore-bottom-btn',
    },
    {
      icon: 'mealIcon',
      dataTest: 'food-bottom-btn',
    },
  ];

  iconArray.map(({ icon: currIcon, dataTest }) => (
    it(`verify if the ${currIcon} exist`, () => {
      const { getByTestId } = renderWithRouter(<Footer />);
      const testIcon = getByTestId(dataTest);

      expect(testIcon).toBeInTheDocument();
      expect(testIcon).toHaveAttribute('src', `${currIcon}.svg`);
    })
  ));

  it('verify the footers position', () => {
    const { getByTestId } = renderWithRouter(<Footer />);

    const footer = Footer().type.styledComponentId;
    // const footer = getByTestId('footer');
    const style = window.getComputedStyle(footer);
    console.log(style);
    // expect(style.position).toBe('fixed');
    // expect(style.top).toBe('0px');
    // const footer = getByTestId('footer');
    // const style = window.getComputedStyle(footer);

    // expect(footer).toBeInTheDocument();
    // expect(style.position).toBe('fixed');
  });

  // it('verify if the drinkIcon exists', () => {
  //   const { getByTestId } = renderWithRouter(<Footer />);
  //   const drinkIcon = getByTestId('drinks-bottom-btn');

  //   expect(drinkIcon).toBeInTheDocument();
  //   expect(drinkIcon).toHaveAttribute('src');
  // });

  // it('verify if the drinkIcon exists', () => {
  //   const { getByTestId } = renderWithRouter(<Footer />);
  //   const drinkIcon = getByTestId('explore-bottom-btn');

  //   expect(drinkIcon).toBeInTheDocument();
  //   expect(drinkIcon).toHaveAttribute('src');
  // });

  // it('verify if the drinkIcon exists', () => {
  //   const { getByTestId } = renderWithRouter(<Footer />);
  //   const drinkIcon = getByTestId('food-bottom-btn');

  //   expect(drinkIcon).toBeInTheDocument();
  //   expect(drinkIcon).toHaveAttribute('src');
  // });
});

// [
//   { icon: drinkIcon, dataTest: 'drinks-bottom-btn' },
//   { icon: exploreIcon, dataTest: 'explore-bottom-btn' },
//   { icon: foodIcon, dataTest: 'food-bottom-btn' }];
