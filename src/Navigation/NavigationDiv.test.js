import { render, screen } from '@testing-library/react';

import NavigationDiv from "./NavigationDiv";

it("renders the div with the callback", () => {
  const mockClickHandler = jest.fn();
  const result = render(<NavigationDiv path="/" handleClick={mockClickHandler}>Mousey Mousey</NavigationDiv>);

  const nav = result.container.querySelector('div');
  expect(nav.textContent).toBe('Mousey Mousey');

  nav.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(mockClickHandler.mock.calls.length).toEqual(1);
})
