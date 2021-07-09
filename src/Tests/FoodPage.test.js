// import React from 'react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from './renderWithRouter';
// import FoodPage from '../Pages/FoodPage';
// import Header from '../Components/Header';

// describe('full app rendering/navigating', () => {
//   it('test if there are routes to those pages', () => {
//     const { getByIdTest } = renderWithRouter(<FoodPage />);
//     const inputLink = getByTestId('profile-top-btn');
//     expect(inputLink).toBeInTheDocument();
//   });
//   it('rendering a component that uses useLocation', () => {
//     const route = '/perfil';
//     renderWithRouter(<Header />, { route });
//     expect(screen.getByTestId('location-display')).toHaveTextContent(route);
//   });
// });
