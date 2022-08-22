// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more:
import '@testing-library/jest-dom';
import '@testing-library/react';

import casual from 'casual';

globalThis.makeAnExchangeSummary = function() {
  return {
    id: casual.text,
    image: casual.url,
    name: casual.text,
    country: casual.country,
    url: casual.url,
    trust_score_rank: parseInt(casual.random * 10),
  }
}

globalThis.makeAnExchangePage = function (entries = 10) {
  let tries = 0;
  const result = [];

  while(result.length < entries) {
    const exchange = makeAnExchangeSummary();

    const dup = result.find(entry => {
      entry.id === exchange.id;
    });

    if (dup) {
      tries++;

      if (tries > 100) {
        throw new Error("Too many tries for id");
      }
    } else {
      result.push(exchange);
    }
  }

  return result;
}
