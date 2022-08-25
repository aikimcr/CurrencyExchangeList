// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more:
import '@testing-library/jest-dom';
import '@testing-library/react';

import casual from 'casual';

globalThis.makeAnExchangeSummary = function(id) {
  const url = casual.url;
  const image = `${url}${casual.word}.png`;

  return {
    id: id || casual.word,
    image,
    name: casual.text,
    country: casual.country,
    url,
    trust_score_rank: casual.integer(1, 100),
  }
}

globalThis.makeAnExchangeDetail = function(args = {}) {
  const name = casual.word;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const getYearEstablished = () => {
    if (args.years_established) {
      return currentYear - args.years_established;
    } else if (args.hasOwnProperty('years_established')) {
      return null;
    } else {
      return currentYear - casual.integer(0, 10);
    }
  };

  const socialMediaTypes = ['facebook', 'reddit', 'telegram', 'slack', 'other_1', 'other_2'];
  const socialMedia = {};
  const url = casual.url;
  const image = `${url}${casual.word}.png`;

  socialMediaTypes.forEach((type) => {
    const [serviceName, index] = type.split(/_/);
    const key = (isNaN(index)) ? `${serviceName}_url` : `${serviceName}_url_${index}`;

    if (args.hasOwnProperty(type)) {
      socialMedia[key] = args.type || '';
    } else {
      socialMedia[key] = `https://www.${serviceName}_fake.com/${name}`;
    }
  });

  if (args.hasOwnProperty('twitter_handle')) {
    socialMedia.twitter_handle = args.twitter_handle || '';
  } else {
    socialMedia.twitter_handle = name.toLowerCase();
  }

  return {
    id: name.toLowerCase(),
    image,
    name: name.replace(/^./, name.charAt(0).toUpperCase()),
    country: casual.country,
    url,
    year_established: getYearEstablished(),
    ...socialMedia,
    trust_score_rank: casual.integer(1, 100),
    description: casual.words(25),
  }
}

globalThis.makeAnExchangePage = function (entries = 10) {
  let ids = [];
  while(ids.length < 0) {
    const newId = casual.word;

    if (!ids.includes(newId)) {
      ids.push(newId);
    }
  }

  const result = ids.map((id) => {
    return makeAnExchangeSummary(id);
  });

  return result;
}
