function generateState() {
  const state = Math.random();
  window.sessionStorage.setItem('state', state);
  return state;
}

function validateState(state) {
  if (!state) {
    return false;
  }
  const storageState = window.sessionStorage.getItem('state');
  return state === storageState;
}

function clearQueryParams() {
  window.history.replaceState(null, null, window.location.pathname);
}

export {
  generateState,
  validateState,
  clearQueryParams,
};
