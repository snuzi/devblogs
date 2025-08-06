import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders DevBlogs.net navbar brand', () => {
  render(<App />);
  const linkElement = screen.getByText(/DevBlogs.net/i);
  expect(linkElement).toBeInTheDocument();
});
