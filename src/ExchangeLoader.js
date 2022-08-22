// Load the data from the server.  Handle all the boilerplate for xhr
// correctly.

let testResolver = [];

function __load_test(url, query = {}) {
  return new Promise((resolve, reject) => {
    debugger;
    testResolver.push(resolve);
  })
}

function __load(url, query = {}) {
  const requestUrl = new URL(url);

  for (const param in query) {
    requestUrl.searchParams.set(param, query[param]);
  }

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', requestUrl);
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
      else {
        reject({status: xhr.status, message: xhr.responseText});
      }
    };
    xhr.send();
  });
}


export function load(url, query) {
  // I really hate this approach.  It feels like a security hole.
  // But I can't get Jest to mock this module no matter what I try.
  if (process.env.NODE_ENV === 'test') {
    const p = __load_test(url, query);
    return p;
  } else {
    return __load(url, query);
  }
}

export function __getTestResolver() {
  if (!process.env.NODE_ENV === 'test') {
    return null;
  }

  if (testResolver.length > 0) {
    return testResolver.shift();
  } else {
    throw new Error("Not in a test?");
  }
}

export function __resetTestResolver() {
  testResolver = null;
}

export default load;
