import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import NavigationButton from "./NavigationButton";

it("renders the button with the callback", () => {
  const mockClickHandler = jest.fn();

  // Wrap the render in BrowserRouter to allow the use of useNavigate.
  const result = render(
    <BrowserRouter>
      <NavigationButton path="/" handleClick={mockClickHandler}>Mousey Mousey</NavigationButton>
    </BrowserRouter>
  );

  const nav = result.container.querySelector('button');
  expect(nav.textContent).toBe('Mousey Mousey');

  nav.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(mockClickHandler.mock.calls.length).toEqual(1);
})
