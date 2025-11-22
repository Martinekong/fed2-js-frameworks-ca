import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StarRating from 'components/StarRating';

describe('StarRating', () => {
  test('renders correct number of stars based on rating', () => {
    render(<StarRating rating={3.4} />);

    expect(screen.getByText(/⭐ ⭐ ⭐/)).toBeInTheDocument();
  });

  test('renders minimum 1 star even if rating is 0', () => {
    render(<StarRating rating={0} />);

    expect(screen.getByText(/⭐/)).toBeInTheDocument();
  });

  test('displays correct rating text', () => {
    render(<StarRating rating={4.2} />);

    expect(
      screen.getByText((content) => content.includes('4.2/5.0'))
    ).toBeInTheDocument();
  });
});
