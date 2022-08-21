// A slightly easer to use fetch() function. It handles
// building the URL for us.
function fetch(url, query = {}) {
  const requestUrl = new URL(url);

  for (param in query) {
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
