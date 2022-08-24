import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { loadList } from "./ExchangeLoader";

let mockResolver = null;
let mockPromise = null;

jest.mock('./ExchangeLoader', () => {
  const originalModule = jest.requireActual('./ExchangeLoader');

  return {
    __esModule: true,
    ...originalModule,
    loadList: async () => {
      return mockPromise;
    },
  };
});

beforeEach(() => {
  mockPromise = new Promise((resolve, reject) => {
    mockResolver = resolve;
  });
});

afterEach(() => {
  mockPromise = null;
  mockResolver = null;
});

test('renders learn react link', () => {
  const result = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(result.container.childElementCount).toEqual(1);
});
