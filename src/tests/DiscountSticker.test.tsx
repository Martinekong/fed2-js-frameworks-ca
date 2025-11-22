import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DiscountSticker from 'components/DiscountSticker';

describe('DiscountSticker', () => {
  test('shows discount percentage', () => {
    render(<DiscountSticker price={200} discountedPrice={100} />);

    expect(screen.getByText('-50%')).toBeInTheDocument();
  });

  test('does not show if no discount', () => {
    render(<DiscountSticker price={200} discountedPrice={200} />);

    expect(screen.queryByText(/-\d+%/)).not.toBeInTheDocument();
  });
});
