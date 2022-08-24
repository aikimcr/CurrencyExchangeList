import { render, screen } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';

let mockLocation = null;
let mockResolver = null;
let mockPromise = null;

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useLocation: () => {
      return mockLocation;
    },
  }
});

jest.mock('../ExchangeLoader', () => {
  const originalModule = jest.requireActual('../ExchangeLoader');

  return {
    __esModule: true,
    ...originalModule,
    loadList: async () => {
      return mockPromise;
    },
  };
});

import ExchangeListPage from "./ExchangeListPage";

beforeEach(() => {
  mockLocation = {
    hash: '',
    key: 'default',
    pathname: '/',
    search: '',
    state: null,
  };

  mockPromise = new Promise((resolve, reject) => {
    mockResolver = resolve;
  });
})

afterEach(() => {
  mockLocation = null;
  mockPromise = null;
  mockResolver = null;
})

it("renders page 1 by default", () => {
  // Wrap the render in BrowserRouter to allow the use of useNavigate.
  const result = render(
    <BrowserRouter>
      <ExchangeListPage />
    </BrowserRouter>
  );

  const page = result.container.querySelector('div');
  // The container won't show any data right away, but that's okay.
  // This way we can be sure the page number is being passed correctly.
  expect(page.className).toBe('message');
  expect(page.textContent).toBe('Loading Page 1...');
  expect(page.childElementCount).toBe(0);
})

it("renders page 2 when specified", () => {
  mockLocation.search = 'page=2';

  // Wrap the render in BrowserRouter to allow the use of useNavigate.
  const result = render(
    <BrowserRouter>
      <ExchangeListPage />
    </BrowserRouter>
  );

  const page = result.container.querySelector('div');
  // The container won't show any data right away, but that's okay.
  // This way we can be sure the page number is being passed correctly.
  expect(page.className).toBe('message');
  expect(page.textContent).toBe('Loading Page 2...');
  expect(page.childElementCount).toBe(0);

})
