import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import NavigationDiv from "./NavigationDiv";

it("renders the div with the callback", () => {
  const mockClickHandler = jest.fn();

  // Wrap the render in BrowserRouter to allow the use of useNavigate.
  const result = render(
    <BrowserRouter>
      <NavigationDiv path="/" handleClick={mockClickHandler}>Mousey Mousey</NavigationDiv>
    </BrowserRouter>
  );

  const nav = result.container.querySelector('div');
  expect(nav.textContent).toBe('Mousey Mousey');

  nav.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(mockClickHandler.mock.calls.length).toEqual(1);
})
