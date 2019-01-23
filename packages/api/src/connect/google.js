const passport = require('passport');
const { ok, err400 } = require('../utils/router');
const { pushAttestation } = require('../uport');

async function connectGoogle(req, res, next) {
  const pushData = {
    did: req.query.did,
    pushToken: req.query.pushToken,
    publicEncKey: req.query.publicEncKey,
  };

  passport.authenticate('google', async (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return err400(res, 'Got an empty Google user object.');
    }
    
    await pushAttestation(pushData, 'google', user.id);

    ok(res);
  })(req, res, next);
}

module.exports = {
  connectGoogle,
};
