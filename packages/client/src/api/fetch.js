const BASE_URL = process.env.REACT_APP_API || 'http://localhost:3001';

function fetchPost(path, data) {
  return fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export {
  fetchPost,
}
