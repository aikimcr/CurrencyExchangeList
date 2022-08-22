import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders learn react link', () => {
  const result = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(result.container.childElementCount).toEqual(1);
});
