/**
 * Ngrok should solely be used on a development environment for hooks, as a replacement for
 * localhost:3001.
 * For this reason it's lazy loaded and its dependency is listed in devDependencies.
 */
const { sleep } = require('./timeout');

const PORT = process.env.API_PORT || process.env.PORT || 3001;

let instance;
async function host() {
  if (instance) {
    return instance;
  }
  instance = new Promise(async (resolve) => {
    const ngrok = require('ngrok');
    await sleep(1e3); // Ngrok's port sometimes isn't closed instantly on nodemon reload
    const newHost = await ngrok.connect(PORT);
    resolve(newHost);
  });
  return instance;
}

module.exports = {
  host,
};
