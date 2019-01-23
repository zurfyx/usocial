// Twitter flow with oauth https://gist.github.com/joshj/1933640

const passport = require('passport');
const fetch = require('node-fetch');
const { OAuth } = require('oauth');
const { ok, err400 } = require('../utils/router');
const { pushAttestation } = require('../uport');

const oauth = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token', 
  process.env.REACT_APP_TWITTER_CLIENT_ID,
  process.env.TWITTER_CLIENT_SECRET,
  '1.0A',
  `${process.env.REACT_APP_CLIENT || 'http://localhost:3000'}/dashboard/connect/twitter`,
  'HMAC-SHA1'
);

let requestStored;
let secretStored; // TODO

async function twitterRequestToken(req, res) {
  oauth.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      err400('Can\'t retrieve Twitter request token');
      return;
    }
    
    requestStored = oauthToken; // No need to store, the client will already carry an identical copy of it
    secretStored = oauthTokenSecret;
    res.json({ oauthToken });
      // req.session.oauthRequestToken = oauthToken;
      // req.session.oauthRequestTokenSecret = oauthTokenSecret;
      // console.info(oauthToken)
      // console.info(oauthTokenSecret)
      // console.info(results)
      // res.redirect("https://api.twitter.com/oauth/authorize?oauth_token="+oauthToken);      
  }); 
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
  console.info(requestStored)

  oauth.getOAuthAccessToken(oauthToken, secretStored, oauthVerifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send("Error getting OAuth access token : " + util.inspect(error) + "["+oauthAccessToken+"]"+ "["+oauthAccessTokenSecret+"]"+ "["+util.inspect(results)+"]", 500);
    } else {
      console.info(oauthAccessToken)
      console.info(oauthAccessTokenSecret)
      
      oauth.get("https://api.twitter.com/1.1/account/verify_credentials.json", oauthAccessToken, oauthAccessTokenSecret, function (error, data, response) {
        if (error) {
            // res.redirect('/sessions/connect');
            console.error(error)
            // res.send("Error getting twitter screen name : " + util.inspect(error), 500);
        } else {
            var parsedData = JSON.parse(data);
  
          // req.session.twitterScreenName = response.screen_name; 
          console.info(parsedData.id)   
          res.send('You are signed in: ' + parsedData.screen_name);
        } 
      });
    }
  });
  
  // oauth.get(
  //   'https://api.twitter.com/1.1/trends/place.json?id=23424977',
  //   oauthToken, //test user token
  //   oauthVerifier, //test user secret            
  //   function (e, data, res){
  //     if (e) console.error(e);        
  //     console.log(require('util').inspect(data));
  //     // done();      
  //   }); 

  // const pushData = {
  //   did: req.query.did,
  //   pushToken: req.query.pushToken,
  //   publicEncKey: req.query.publicEncKey,
  // };

  // passport.authenticate('twitter', async (err, user) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   if (!user) {
  //     return err400(res, 'Got an empty Twitter user object.');
  //   }
    
  //   await pushAttestation(pushData, 'twitter', user.id);

  //   ok(res);
  // })(req, res, next);
}

module.exports = {
  twitterRequestToken,
  connectTwitter,
};
