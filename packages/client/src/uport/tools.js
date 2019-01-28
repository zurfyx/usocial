const ISS_DID = process.env.REACT_APP_UPORT_DID;

function validateAttestation(attestation) {
  const properties = ['iat', 'sub', 'claim', 'exp', 'iss', 'jwt'];
  if (properties.find(property => !attestation[property])) {
    return false;
  }

  // Check claim
  const claim = attestation.claim;
  if (!claim || typeof claim.usocialIdentity !== 'object') {
    return false;
  }

  // Check uSocial claim specifically
  const usocial = claim.usocialIdentity;
  if (Object.values(usocial).find(value => !Array.isArray(value))) {
    return false;
  }

  // Usocial claims are always key-value; value => string
  if (Object.values(usocial).find((values) => {
    return !values.find(value => typeof value === 'string');
  })) {
    return false;
  }

  return true;
}

function verifyAttestation(attestation) {
  if (!validateAttestation(attestation)) {
    return false;
  }

  if (attestation.iss !== ISS_DID) {
    return false;
  }

  return true;
}

function sortAttestations(attestations) {
  return attestations.sort((a, b) => b.iat - a.iat); // Mutable should be fine for now
}

function currentAttestation(attestations) {
  const sorted = sortAttestations(attestations);
  return sorted.find(attestation => verifyAttestation(attestation));
}

function addAttestation(attestations, newAttestation) {
  // uPort app updates attestations with same issuer and claim
  const purgedObsolete = attestations.filter((attestation) => {
    return attestation.iss !== newAttestation.iss
      || attestation.sub !== newAttestation.sub
      || JSON.stringify(attestation.claim) !== JSON.stringify(newAttestation.claim);
  });

  return purgedObsolete.concat(newAttestation);
}

export {
  validateAttestation,
  verifyAttestation,
  sortAttestations,
  currentAttestation,
  addAttestation,
}
