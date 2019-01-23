// Twitter flow with oauth https://gist.github.com/joshj/1933640

const passport = require('passport');
const fetch = require('node-fetch');
const { OAuth } = require('oauth');
const { ok, err400 } = require('../utils/router');
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

let requestStored;
let correctStored;
let secretStored; // TODO

async function twitterRequestToken(req, res) {
  const [oauthToken, oauthTokenSecret, results] = await getOAuthRequestToken();
  // oauth.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
  //   if (error) {
  //     err400('Can\'t retrieve Twitter request token');
  //     return;
  //   }
    console.info(results)
    requestStored = oauthToken; // No need to store, the client will already carry an identical copy of it
    secretStored = correctStored = oauthTokenSecret;
    secretStored = crypt.encrypt(secretStored);
    res.json({ oauthToken });
      // req.session.oauthRequestToken = oauthToken;
      // req.session.oauthRequestTokenSecret = oauthTokenSecret;
      // console.info(oauthToken)
      // console.info(oauthTokenSecret)
      // console.info(results)
      // res.redirect("https://api.twitter.com/oauth/authorize?oauth_token="+oauthToken);      
  // }); 
  // const token = await fetch('https://api.twitter.com/oauth/request_token', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     oauth_callback: `${process.env.REACT_APP_CLIENT || 'http://localhost:3000'}/dashboard/connect/twitter`,
  //   }),
  // });
  // console.info(token)
  // res.send(token);
}

async function connectTwitter(req, res, next) {
  const {
    did,
    pushToken,
    publicEncKey,
    oauth_token: oauthToken,
    oauth_verifier: oauthVerifier,
  } = req.query;
  const pushData = { did, pushToken, publicEncKey };
  console.info(oauthToken)
  console.info('match')
  console.info(correctStored)
  // console.info(secretStored)
  oauthTokenSecret = crypt.decrypt(secretStored)
  console.info(oauthTokenSecret)
  console.info('/match')

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
