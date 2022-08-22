import { render, screen } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';

import ExchangeListPage from "./ExchangeListPage";

let mockParams = null;

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useParams() {
      return mockParams;
    }
  }
});

beforeEach(() => {
  mockParams = new URLSearchParams();
})

afterEach(() => {
  mockParams = null;
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
  mockParams.set('page', 2);
  
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
