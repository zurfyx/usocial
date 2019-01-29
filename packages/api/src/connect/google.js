const passport = require('passport');
const { ok, err400 } = require('../utils/router');
const { pushAttestation, verifyAttestation } = require('../uport');
const AttestationBuilder = require('../uport/AttestationBuilder');

async function connectGoogle(req, res, next) {
  const attestedObj = req.body.attested && await verifyAttestation(req.body.attested, req.body.did);
  const pushData = {
    did: req.body.did,
    pushToken: req.body.pushToken,
    publicEncKey: req.body.publicEncKey,
  };

  passport.authenticate('google', async (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return err400(res, 'Got an empty Google user object.');
    }
    
    const attestationBuilder = new AttestationBuilder()
      .addMany(attestedObj && attestedObj.claim.usocialIdentity)
      .addOne('google', user.id);
    const attestationValues = attestationBuilder.values;
    const { attestation } = await pushAttestation(pushData, attestationValues);

    res.json(attestation);
  })(req, res, next);
}

module.exports = {
  connectGoogle,
};
