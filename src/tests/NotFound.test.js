import renderWithRCA from './helper/renders/renderWithRouterAndContextAPI';

it('tests the NotFound Page', () => {
  const { history, getByRole } = renderWithRCA();
  history.push('/batatatatatatata');
  expect(getByRole('heading', { name: /not found/i })).toHaveTextContent(
    'Not Found',
  );
});
