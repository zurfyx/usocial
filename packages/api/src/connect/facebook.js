const passport = require('passport');
const { err400 } = require('../utils/router');
const { pushAttestation, verifyAttestation } = require('../uport');
const AttestationBuilder = require('../uport/AttestationBuilder');

async function connectFacebook(req, res, next) {
  const attestedObj = req.body.attested && await verifyAttestation(req.body.attested, req.body.did);
  const pushData = {
    did: req.body.did,
    pushToken: req.body.pushToken,
    publicEncKey: req.body.publicEncKey,
  };

  passport.authenticate('facebook', async (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return err400(res, 'Got an empty Facebook user object.');
    }
    
    const attestationBuilder = new AttestationBuilder()
      .addMany(attestedObj && attestedObj.claim.usocialIdentity)
      .addOne('facebook', user.id);
    const attestationValues = attestationBuilder.values;
    const { attestation } = await pushAttestation(pushData, attestationValues);

    res.json(attestation);
  })(req, res, next);
}

module.exports = {
  connectFacebook,
};
