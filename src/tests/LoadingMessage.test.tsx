import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingMessage from 'components/LoadingMessage';

test('shows error text', () => {
  render(<LoadingMessage />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
