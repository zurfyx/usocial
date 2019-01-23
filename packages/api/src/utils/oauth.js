const util = require('util');

function promisifiedActions(oauthInstance) {
  oauthInstance.get[util.promisify.custom] = (url, oauthAccessToken, oauthAccessTokenSecret) => {
    return new Promise((resolve, reject) => {
      oauthInstance.get(url, oauthAccessToken, oauthAccessTokenSecret, (error, data, response) => {
        if (error) {
          reject(error);
          return;
        }
        resolve([ data, response ]);
      });
    })
  }
  const get = util.promisify(oauthInstance.get).bind(oauthInstance);

  oauthInstance.getOAuthRequestToken[util.promisify.custom] = () => {
    return new Promise((resolve, reject) => {
      oauthInstance.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve([ oauthToken, oauthTokenSecret, results ]);
      });
    })
  }
  const getOAuthRequestToken = util.promisify(oauthInstance.getOAuthRequestToken).bind(oauthInstance);

  oauthInstance.getOAuthAccessToken[util.promisify.custom] = (oauthToken, oauthTokenSecret, oauthVerifier) => {
    return new Promise((resolve, reject) => {
      oauthInstance.getOAuthAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve([ oauthAccessToken, oauthAccessTokenSecret, results ]);
      });
    })
  }
  const getOAuthAccessToken = util.promisify(oauthInstance.getOAuthAccessToken).bind(oauthInstance);

  return {
    get,
    getOAuthRequestToken,
    getOAuthAccessToken,
  }
}

module.exports = promisifiedActions;
