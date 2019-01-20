import { fetchPost } from './fetch';

function connectEmail(email) {
  return fetchPost('/connect/email', {
    email,
  });
}

export {
  connectEmail,
};
