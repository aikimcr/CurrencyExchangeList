import { BrowserRouter } from 'react-router-dom';
import { act, render, waitFor, screen } from '@testing-library/react';

import { loadList } from "../ExchangeLoader";

import ExchangeListContext from "./ExchangeListContext";

let mockResolver = null;
let mockPromise = null;
let mockLoadCalls = null;

jest.mock('../ExchangeLoader', () => {
  const originalModule = jest.requireActual('../ExchangeLoader');

  return {
    __esModule: true,
    ...originalModule,
    loadList() {
      mockLoadCalls.push(Array.from(arguments));
      return mockPromise;
    },
  };
});

import ExchangeListContainer from "./ExchangeListContainer";

beforeEach(() => {
  mockLoadCalls = [];
  mockPromise = new Promise((resolve, reject) => {
    mockResolver = resolve;
  });
});

afterEach(() => {
  mockLoadCalls = null;
  mockPromise = null;
  mockResolver = null;
});

it ("renders page 1 after getting the data", async () => {
  const page = makeAnExchangePage();
  const context = {page: 1};

  const result = render(
    <BrowserRouter>
      <ExchangeListContext.Provider value={context}>
        <ExchangeListContainer page="1" />
      </ExchangeListContext.Provider>
    </BrowserRouter>
  );

  const messagePage = await result.findByText('Loading Page 1...');
  expect(messagePage.className).toBe('message');
  expect(messagePage.childElementCount).toBe(0);

  // The next few operations here should result in a rerender,
  // so put them inside an act()
  await act(async function() {
    mockResolver(page);
  });

  const container = result.container.firstChild;
  expect(container.className).toBe('list-container');
  expect(container.childElementCount).toBe(3);
  expect(container.querySelector('.pageNumber')).toHaveTextContent('Page 1');
  expect(container.querySelector('.controls').childElementCount).toBe(2);
  expect(container.querySelector('.controls').firstChild.className).toBe('hidden');
  expect(container.querySelector('.controls').lastChild.className).toBe('nextButton');
  expect(mockLoadCalls.length).toBe(1);
  expect(mockLoadCalls[0].length).toBe(1);
  expect(mockLoadCalls[0][0]).toEqual(1);
})

it ("renders page 2 after getting the data", async () => {
  const page = makeAnExchangePage();
  const context = {page: 2};

  const result = render(
    <BrowserRouter>
      <ExchangeListContext.Provider value={context}>
        <ExchangeListContainer page="2" />
      </ExchangeListContext.Provider>
    </BrowserRouter>
  );

  const messagePage = await result.findByText('Loading Page 2...');
  expect(messagePage.className).toBe('message');
  expect(messagePage.childElementCount).toBe(0);

  await act(async () => {
    mockResolver(page);
  });

  const container = result.container.firstChild;
  expect(container.className).toBe('list-container');
  expect(container.childElementCount).toBe(3);
  expect(container.querySelector('.pageNumber')).toHaveTextContent('Page 2');;
  expect(container.querySelector('.controls').childElementCount).toBe(2);
  expect(container.querySelector('.controls').firstChild.className).toBe('prevButton');
  expect(container.querySelector('.controls').lastChild.className).toBe('nextButton');
  expect(mockLoadCalls.length).toBe(1);
  expect(mockLoadCalls[0].length).toBe(1);
  expect(mockLoadCalls[0][0]).toEqual(2);
})

it ("clicking next page loads next page", async () => {
  const page1 = makeAnExchangePage();
  const page2 = makeAnExchangePage();
  const context = {page: 1};

  const result = render(
    <BrowserRouter>
      <ExchangeListContext.Provider value={context}>
        <ExchangeListContainer page="1" />
      </ExchangeListContext.Provider>
    </BrowserRouter>
  );

  let messagePage = await result.findByText('Loading Page 1...');
  expect(messagePage.className).toBe('message');
  expect(messagePage.childElementCount).toBe(0);

  await act(async () => {
    mockResolver(page1);
  });

  let container = result.container.firstChild;
  expect(container.className).toBe('list-container');
  expect(container.childElementCount).toBe(3);
  expect(container.querySelector('.pageNumber')).toHaveTextContent('Page 1');
  expect(container.querySelector('.controls').childElementCount).toBe(2);
  expect(container.querySelector('.controls').firstChild.className).toBe('hidden');
  expect(container.querySelector('.controls').lastChild.className).toBe('nextButton');
  expect(mockLoadCalls.length).toBe(1);
  expect(mockLoadCalls[0].length).toBe(1);
  expect(mockLoadCalls[0][0]).toEqual(1);

  // Make a new promise and resolver
  mockPromise = new Promise((resolve, reject) => {
    mockResolver = resolve;
  });

  const nextButton = container.querySelector('.nextButton');

  // The next few operations here should result in a rerender,
  // so put them inside an act()
  await act(async function() {
    nextButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  messagePage = await result.findByText('Loading Page 2...');
  expect(messagePage.className).toBe('message');
  expect(messagePage.childElementCount).toBe(0);

  await act(async () => {
    mockResolver(page2);
  });

  container = result.container.firstChild;
  expect(container.className).toBe('list-container');
  expect(container.childElementCount).toBe(3);
  expect(container.querySelector('.pageNumber')).toHaveTextContent('Page 2');;
  expect(container.querySelector('.controls').childElementCount).toBe(2);
  expect(container.querySelector('.controls').firstChild.className).toBe('prevButton');
  expect(container.querySelector('.controls').lastChild.className).toBe('nextButton');
  expect(mockLoadCalls.length).toBe(2);
  expect(mockLoadCalls[1].length).toBe(1);
  expect(mockLoadCalls[1][0]).toEqual(2);
})
