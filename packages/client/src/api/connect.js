import { fetchPost } from './fetch';

function connectEmail(email, name = '') {
  return fetchPost('/connect/email', {
    email,
    name,
  });
}

export {
  connectEmail,
};
