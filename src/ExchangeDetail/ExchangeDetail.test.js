import { BrowserRouter } from 'react-router-dom';
import { act, render } from '@testing-library/react';
import casual from 'casual';

import { loadList } from "../ExchangeLoader";

import ExchangeDetailContext from "./ExchangeDetailContext";

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
    state: {page: 1, exchangeId: exchangeId },
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

function assertHeader(exchange, header, exchangeArgs) {
  expect(header.className).toBe('header');
  expect(header.childElementCount).toBe(1);

  const title = header.firstChild;
  expect(title.textContent).toBe(`Details for Exchange ${exchange.name}`);
}

function assertControls(exchange, controls, exchangeArgs) {
  expect(controls.className).toBe('controls');
  expect(controls.childElementCount).toBe(1);
  expect(controls.firstChild.className).toBe('backToMain');
  expect(controls.firstChild.textContent).toBe('Back To Main');
}

function assertSocialMedia(exchange, socialMedia, exchangeArgs) {
  expect(socialMedia.className).toBe('socialMediaContainer');
  expect(socialMedia.childElementCount).toBe(1);

  const links = socialMedia.firstChild;
  const linkItems = Array.from(links.children);

  for(const key in exchange) {
    if (key.match(/^.+url/)) {
      expect(key).toContain('url'); // Make sure the key shows up

      // It has a valid value, so there should be an item for it.
      const matchIndex = linkItems.findIndex((item) => {
        return exchange[key].toLowerCase() === item.firstChild.href;
      });

      if (exchange[key].length > 0) {
        expect(matchIndex).toBeGreaterThan(-1);
        expect(key).toContain(linkItems[matchIndex].firstChild.textContent.split(/\s/)[0].toLowerCase());
      } else {
        expect(matchIndex).toEqual(-1);
      }

      if (matchIndex > -1) {
        // Remove the matched item.
        linkItems.splice(matchIndex, 1);
      }
    } else if (key === 'twitter_handle') {
      expect(key).toContain('twitter'); // Make sure the key shows up

      const matchIndex = linkItems.findIndex((item) => {
        return item.firstChild.href.match(/twitter/);
      });

      if (exchange.twitter_handle.length > 0) {
        expect(matchIndex).toBeGreaterThan(-1);
        expect(linkItems[matchIndex].firstChild.href).toContain(exchange.twitter_handle);
        expect(linkItems[matchIndex].firstChild.textContent).toBe('Twitter');
      } else {
        expect(matchIndex).toBe(-1);
      }

      if (matchIndex > -1) {
        // Remove the matched item.
        linkItems.splice(matchIndex, 1);
      }
    }
  }

  // All the items should have been matched and removed.
  // Any which are still there were incorrectly included during rendering.
  expect(linkItems).toStrictEqual([]);
}

function assertInfo(exchange, info, exchangeArgs) {
  expect(info.className).toBe('info');
  expect(info.childElementCount).toBe(8);

  const logo = info.children[0];
  expect(logo.className).toBe('logo');
  expect(logo.childElementCount).toBe(1);
  expect(logo.firstChild.src).toBe(exchange.image.toLowerCase()); // URLs always return lower case
  expect(logo.firstChild.alt).toBe('logo');

  expect(info.children[1].textContent).toBe(exchange.name);
  expect(info.children[2].textContent).toBe(exchange.country);

  const urlDiv = info.children[3];
  expect(urlDiv.className).toBe('url');
  expect(urlDiv.childElementCount).toBe(1);
  expect(urlDiv.firstChild.tagName).toBe('A');
  expect(urlDiv.firstChild.href).toBe(exchange.url.toLowerCase()); // URLs always return lower case

  expect(info.children[4].textContent).toBe(`Trust Rank ${exchange.trust_score_rank}`);
  expect(info.children[5].textContent).toBe(`Established ${exchangeArgs.years_established} years (${exchange.year_established})`);
  expect(info.children[6].textContent).toBe(exchange.description);
  assertSocialMedia(exchange, info.children[7], exchangeArgs);
}

function assertDetail(exchange, container, exchangeArgs) {
  expect(container.className).toBe('exchange-details');
  expect(container.childElementCount).toBe(3);

  assertHeader(exchange, container.children[0], exchangeArgs);
  assertControls(exchange, container.children[1], exchangeArgs);
  assertInfo(exchange, container.children[2], exchangeArgs);
}

it("renders an exchange", async () => {
  const exchangeArgs = {years_established: 3};
  const exchange = makeAnExchangeDetail(exchangeArgs);
  mockLocation.pathName = `/exchange/${exchange.id}`;
  mockLocation.state.exchangeId = exchange.id;
  mockParams.exchangeId = exchange.id;
  const context = {
    page: 1,
    exchangeId: exchange.id,
  };

  // Wrap the render in BrowserRouter to allow the use of react_router_dom hooks.
  const result = render(
    <BrowserRouter>
      <ExchangeDetailContext.Provider value={context}>
        <ExchangeDetailPage exchangeId={exchange.id}/>
      </ExchangeDetailContext.Provider>
    </BrowserRouter>
  );

  const messagePage = result.container.querySelector('div');
  // The container won't show any data right away, but that's okay.
  // This way we can be sure the exchange id is being passed correctly.
  expect(messagePage.className).toBe('message');
  expect(messagePage.textContent).toBe(`Loading Exchange '${mockParams.exchangeId}'...`);
  expect(messagePage.childElementCount).toBe(0);

  // The next few operations here should result in a rerender,
  // so put them inside an act()
  await act(async function() {
    mockResolver(exchange);
  });

  const container = result.container.firstChild;
  assertDetail(exchange, container, exchangeArgs);
})

it("leaves out empty social media links", async () => {
  const exchangeArgs = {
    years_established: 3,
    other_1: false,
    other_2: false,
    twitter_handle: false,
  };

  const exchange = makeAnExchangeDetail(exchangeArgs);
  mockLocation.pathName = `/exchange/${exchange.id}`;
  mockLocation.state.exchangeId = exchange.id;
  mockParams.exchangeId = exchange.id;
  const context = {
    page: 1,
    exchangeId: exchange.id,
  };

  // Wrap the render in BrowserRouter to allow the use of react_router_dom hooks.
  const result = render(
    <BrowserRouter>
      <ExchangeDetailContext.Provider value={context}>
        <ExchangeDetailPage exchangeId={exchange.id}/>
      </ExchangeDetailContext.Provider>
    </BrowserRouter>
  );

  const messagePage = result.container.querySelector('div');
  // The container won't show any data right away, but that's okay.
  // This way we can be sure the exchange id is being passed correctly.
  expect(messagePage.className).toBe('message');
  expect(messagePage.textContent).toBe(`Loading Exchange '${mockParams.exchangeId}'...`);
  expect(messagePage.childElementCount).toBe(0);

  // The next few operations here should result in a rerender,
  // so put them inside an act()
  await act(async function() {
    mockResolver(exchange);
  });

  const container = result.container.firstChild;
  assertDetail(exchange, container, exchangeArgs);
})
