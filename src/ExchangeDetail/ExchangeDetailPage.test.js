import { BrowserRouter, useParams } from 'react-router-dom';
import { render } from '@testing-library/react';
import casual from 'casual';

let mockLocation = null;
let mockParams = null;
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
    useParams: () => {
      return mockParams;
    },
  }
});

jest.mock('../ExchangeLoader', () => {
  const originalModule = jest.requireActual('../ExchangeLoader');

  return {
    __esModule: true,
    ...originalModule,
    loadDetail: async () => {
      return mockPromise;
    },
  };
});

import ExchangeDetailPage from "./ExchangeDetailPage";

beforeEach(() => {
  const exchangeId = casual.word;
  mockLocation = {
    hash: '',
    key: 'default',
    pathname: `/exchange/${exchangeId}`,
    search: '',
    state: {page: 1, exchangeId: exchangeId},
  };

  mockParams = {exchangeId};

  mockPromise = new Promise((resolve, reject) => {
    mockResolver = resolve;
  });
})

afterEach(() => {
  mockLocation = null;
  mockParams = null;
  mockPromise = null;
  mockResolver = null;
})

it("renders an exchange", () => {
  // Wrap the render in BrowserRouter to allow the use of react_router_dom hooks.
  const result = render(
    <BrowserRouter>
      <ExchangeDetailPage />
    </BrowserRouter>
  );

  const page = result.container.querySelector('div');
  // The container won't show any data right away, but that's okay.
  // This way we can be sure the exchange id is being passed correctly.
  expect(page.className).toBe('message');
  expect(page.textContent).toBe(`Loading Exchange '${mockParams.exchangeId}'...`);
  expect(page.childElementCount).toBe(0);
})
