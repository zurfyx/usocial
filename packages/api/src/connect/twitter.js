// Twitter flow with oauth https://gist.github.com/joshj/1933640

const { OAuth } = require('oauth');
const { ok } = require('../utils/router');
const oauthActions = require('../utils/oauth');
const { pushAttestation } = require('../uport');
const crypt = require('../cryptr');

const oauth = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token', 
  process.env.REACT_APP_TWITTER_CLIENT_ID,
  process.env.TWITTER_CLIENT_SECRET,
  '1.0A',
  `${process.env.REACT_APP_CLIENT || 'http://localhost:3000'}/dashboard/connect/twitter`,
  'HMAC-SHA1'
);
const { get, getOAuthRequestToken, getOAuthAccessToken } = oauthActions(oauth);

async function twitterRequestToken(req, res) {
  const [oauthToken, oauthTokenSecret, results] = await getOAuthRequestToken();

  // oauthTokenSecret should be stored on the server. To prevent the server from having session,
  // hence 100% stateless, we'll be sending them our private token encrypted, which we'll decrypt
  // on the callback.
  const encryptedSecretStore = crypt.encrypt(oauthTokenSecret);
  res.json({ oauthToken, encryptedSecretStore });
}

async function connectTwitter(req, res, next) {
  const {
    did,
    pushToken,
    publicEncKey,
    encryptedSecretStore,
    oauth_token: oauthToken,
    oauth_verifier: oauthVerifier,
  } = req.query;
  const pushData = { did, pushToken, publicEncKey };
  const oauthTokenSecret = crypt.decrypt(encryptedSecretStore);

  const [oauthAccessToken, oauthAccessTokenSecret, results] = await getOAuthAccessToken(oauthToken, oauthTokenSecret, oauthVerifier);
  const [data, response] = await get("https://api.twitter.com/1.1/account/verify_credentials.json", oauthAccessToken, oauthAccessTokenSecret);
  const user = JSON.parse(data);
    
  await pushAttestation(pushData, 'twitter', user.id);

  ok(res);
}

module.exports = {
  twitterRequestToken,
  connectTwitter,
};
