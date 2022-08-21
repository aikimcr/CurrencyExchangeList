// Load the data from the server.  Handle all the boilerplate for xhr
// correctly.
function load(url, query = {}) {
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

export default load;
