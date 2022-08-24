import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import NavigationButton from "./NavigationButton";

it("renders the button with the callback", () => {
  const mockClickHandler = jest.fn();

  // Wrap the render in BrowserRouter to allow the use of useNavigate.
  const result = render(
    <BrowserRouter>
      <NavigationButton
        path="/"
        handleClick={mockClickHandler}
      >
        Mousey Mousey
      </NavigationButton>
    </BrowserRouter>
  );

  const nav = result.container.querySelector('button');
  expect(nav.textContent).toBe('Mousey Mousey');
  expect(nav.className).toBe('');

  nav.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(mockClickHandler.mock.calls.length).toEqual(1);
  expect(mockClickHandler.mock.calls[0][0]).toBe('/');
  expect(mockClickHandler.mock.calls[0][1]).toStrictEqual({});
})

it("renders the button with a className", () => {
  const mockClickHandler = jest.fn();

  // Wrap the render in BrowserRouter to allow the use of useNavigate.
  const result = render(
    <BrowserRouter>
      <NavigationButton
        className="nav1"
        path="/"
        handleClick={mockClickHandler}
      >
        Mousey Mousey
      </NavigationButton>
    </BrowserRouter>
  );

  const nav = result.container.querySelector('button');
  expect(nav.textContent).toBe('Mousey Mousey');
  expect(nav.className).toBe('nav1');

  nav.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(mockClickHandler.mock.calls.length).toEqual(1);
  expect(mockClickHandler.mock.calls[0][0]).toBe('/');
  expect(mockClickHandler.mock.calls[0][1]).toStrictEqual({});
})

it("renders the button with a search", () => {
  const mockClickHandler = jest.fn();
  const search = {
    page: 1,
    id: 21,
  };

  // Wrap the render in BrowserRouter to allow the use of useNavigate.
  const result = render(
    <BrowserRouter>
      <NavigationButton
        className="nav2"
        path="/"
        searchParams={search}
        handleClick={mockClickHandler}
      >
        Mousey Mousey
      </NavigationButton>
    </BrowserRouter>
  );

  const nav = result.container.querySelector('button');
  expect(nav.textContent).toBe('Mousey Mousey');
  expect(nav.className).toBe('nav2');

  nav.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(mockClickHandler.mock.calls.length).toEqual(1);
  expect(mockClickHandler.mock.calls[0][0]).toBe(`/?page=1&id=21`);
  expect(mockClickHandler.mock.calls[0][1]).toStrictEqual({});
})

it("renders the button with a path", () => {
  const mockClickHandler = jest.fn();

  // Wrap the render in BrowserRouter to allow the use of useNavigate.
  const result = render(
    <BrowserRouter>
      <NavigationButton
        className="nav2"
        path="/Cats"
        handleClick={mockClickHandler}
      >
        Mousey Mousey
      </NavigationButton>
    </BrowserRouter>
  );

  const nav = result.container.querySelector('button');
  expect(nav.textContent).toBe('Mousey Mousey');
  expect(nav.className).toBe('nav2');

  nav.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(mockClickHandler.mock.calls.length).toEqual(1);
  expect(mockClickHandler.mock.calls[0][0]).toBe(`/Cats`);
  expect(mockClickHandler.mock.calls[0][1]).toStrictEqual({});
})

it("renders the button with a path and search", () => {
  const mockClickHandler = jest.fn();
  const search = {
    page: 1,
    id: 21,
  };

  // Wrap the render in BrowserRouter to allow the use of useNavigate.
  const result = render(
    <BrowserRouter>
      <NavigationButton
        className="nav2"
        path="/Cats"
        searchParams={search}
        handleClick={mockClickHandler}
      >
        Mousey Mousey
      </NavigationButton>
    </BrowserRouter>
  );

  const nav = result.container.querySelector('button');
  expect(nav.textContent).toBe('Mousey Mousey');
  expect(nav.className).toBe('nav2');

  nav.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(mockClickHandler.mock.calls.length).toEqual(1);
  expect(mockClickHandler.mock.calls[0][0]).toBe(`/Cats?page=1&id=21`);
  expect(mockClickHandler.mock.calls[0][1]).toStrictEqual({});
})
