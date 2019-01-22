const passport = require('passport');
const { ok, err400 } = require('../utils/router');
const { pushAttestation } = require('../uport');

async function connectFacebook(req, res, next) {
  const pushData = {
    did: req.query.did,
    pushToken: req.query.pushToken,
    publicEncKey: req.query.publicEncKey,
  };

  passport.authenticate('facebook', async (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return err400(res, 'Got an empty Facebook user object.');
    }
    
    await pushAttestation(pushData, 'facebook', user.id);

    ok(res);
  })(req, res, next);
}

module.exports = {
  connectFacebook,
};
