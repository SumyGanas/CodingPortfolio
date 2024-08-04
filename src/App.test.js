import { render, screen } from '@testing-library/react';
import TradingApp from './TradingApp';

test('renders learn react link', () => {
  render(<TradingApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
