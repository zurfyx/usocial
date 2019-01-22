function timeout(fn, ms) {
  return new Promise((resolve) => {
    const newFn = () => {
      fn();
      resolve();
    }
    setTimeout(newFn(), ms);
  });
}

async function sleep(ms) {
  return timeout(() => {}, ms);
}

module.exports = {
  timeout,
  sleep,
};
