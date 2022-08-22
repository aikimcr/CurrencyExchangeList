import { render, screen } from '@testing-library/react';

import ShowUrl from "./ShowUrl";

it("renders the URL with appropriate values", () => {
  const url = "https://foo/";
  const result = render(<ShowUrl url={url} />);

  const link = result.container.querySelector('a');
  expect(link.textContent).toBe(url);
  expect(link.href).toBe(url);
  expect(link.target).toBe("_blank");
})

it("renders the description if it is provided", () => {
  const url = "https://foo/";
  const description = "Random description text";
  const result = render(<ShowUrl url={url} description={description} />);

  const link = result.container.querySelector('a');
  expect(link.textContent).toBe(description);
  expect(link.href).toBe(url);
  expect(link.target).toBe("_blank");

})
