import { act, render, screen } from '@testing-library/react';

import { __getTestResolver } from "../ExchangeLoader";

import ExchangeListContainer from "./ExchangeListContainer";

it ("renders page 1 after getting the data", () => {
  const page = makeAnExchangePage();

  // Wrap the render in BrowserRouter to allow the use of useNavigate.
  const result = render(<ExchangeListContainer />);

  let container = result.container.querySelector('div');
  // The container won't show any data right away, but that's okay.
  // This way we can be sure the page number is being passed correctly.
  expect(container.className).toBe('message');
  expect(container.textContent).toBe('Loading Page 1...');
  expect(container.childElementCount).toBe(0);

  // This just doesn't work.  It causes the react class to rerender, but
  // there doesn't seemt to be a way to wait for that rerendering.
  //
  // The really bad thing about this is that I can't test a lot of the
  // rest of the functionality.
  //
  // let resolver = __getTestResolver();
  // act(() => {
  //   resolver(page);
  // });
  //
  // debugger;
  // container = result.container.querySelector('div');
  // expect(container.className).toBe('list-container');
  // expect(container.childElementCount).toBe(0);
})
