import { render, screen } from '@testing-library/react';

import NavigationButton from "./NavigationButton";

it("renders the button with the callback", () => {
  const mockClickHandler = jest.fn();
  const result = render(<NavigationButton path="/" handleClick={mockClickHandler}>Mousey Mousey</NavigationButton>);

  const nav = result.container.querySelector('button');
  expect(nav.textContent).toBe('Mousey Mousey');

  nav.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(mockClickHandler.mock.calls.length).toEqual(1);
})
