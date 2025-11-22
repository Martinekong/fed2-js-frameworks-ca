import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessage from 'components/ErrorMessage';

test('shows error text', () => {
  render(<ErrorMessage />);
  expect(
    screen.getByText('Something went wrong. Please try again later.')
  ).toBeInTheDocument();
});
