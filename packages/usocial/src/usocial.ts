/**
 * https://github.com/zurfyx/usocial/blob/development/packages/client/src/uport/tools.js
 */

interface Attestation {
  iat: number;
  sub: string;
  claim: any;
  exp: number;
  iss: string;
  jwt?: string;
}

interface SecurityParams {
  iss: string;
  sub: string;
}

/**
 * Validates attestation format. The boxing JWT should be first verified through uPort.
 */
function validateAttestation(attestation: Attestation): boolean {
  const properties = ['iat', 'sub', 'claim', 'exp', 'iss'];
  if (properties.find(property => !(property in attestation))) { // tslint:ignore-line
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
  const usocialValues: any = Object.values(usocial);
  if (usocialValues.find((values: string[]) => {
    return !values.find(value => typeof value === 'string');
  })) {
    return false;
  }

  return true;
}

/**
 * Valides attestion and verifies authenticity.
 * ISS DID has to match given issuer (i.e. Usocial Identity)
 * SUB DID has to match receiver (i.e. profile DID)
 */
function verifyAttestation(attestation: Attestation, securityParams: SecurityParams): boolean {
  if (!validateAttestation(attestation)) {
    return false;
  }

  if (attestation.iss.toLowerCase() !== securityParams.iss.toLowerCase()) {
    return false;
  }
  if (attestation.sub.toLowerCase() !== securityParams.sub.toLowerCase()) {
    return false;
  }

  return true;
}

/**
 * Sort attestations by issued date.
 * This function doesn't do any validation over the given attestations.
 */
function sortAttestations(attestations: Attestation[]): Attestation[] {
  return attestations.sort((a, b) => b.iat - a.iat); // Mutable should be fine for now
}

/**
 * Chooses the most current verified attestation, or returns undefined if none.
 */
function currentAttestation(attestations: Attestation[], securityParams: SecurityParams): Attestation | undefined {
  const sorted = sortAttestations(attestations);
  return sorted.find(attestation => verifyAttestation(attestation, securityParams));
}

/**
 * Adds attestation on top of attestations, mimicking uPort app.
 * If equal attestations are found (according to ISS, SUB and content), they are purged and replaced
 * for the new one.
 */
function addAttestation(attestations: Attestation[], newAttestation: Attestation): Attestation[] {
  // uPort app updates attestations with same issuer and claim
  const purgedObsolete = attestations.filter((attestation) => {
    return attestation.iss !== newAttestation.iss
      || attestation.sub !== newAttestation.sub
      || JSON.stringify(attestation.claim) !== JSON.stringify(newAttestation.claim);
  });

  return purgedObsolete.concat(newAttestation);
}

/**
 * Returns a list of attested values by platform (i.e. 'email'). Attestions are verified.
 */
function attestedValuesByPlatform(attestations: Attestation[], platform: string, securityParams: SecurityParams): string[] {
  return sortAttestations(attestations).reduce((acc: string[], attestation) => {
    if (!verifyAttestation(attestation, securityParams)) {
      return acc;
    }
    const values: string[] = attestation.claim.usocialIdentity[platform];
    if (!values) {
      return acc;
    }
    return values.reduce((acc, value) => {
      return acc.includes(value) ? acc : acc.concat(value);
    }, acc);
  }, []);
}

/**
 * Returns a list of attested emails. Attestations are verified.
 */
function attestedEmails(attestations: Attestation[], securityParams: SecurityParams): string[] {
  return attestedValuesByPlatform(attestations, 'email', securityParams);
}

// As a developer implementing an attestation verifier, you may not need it. uPort does already 
// do this for you through authenticateDisclosureResponse or verifyJWT.
// This function should be used through already-known invalid attestations as a way to determine a
// possible cause of the invalidation.
function hasExpired(attestation: Attestation) {
  if (!attestation.exp) {
    throw new Error('Attestation has no expiration (exp) defined.')
  }

  return Date.now() > attestation.exp * 1000;
}

export {
  Attestation,
  validateAttestation,
  verifyAttestation,
  sortAttestations,
  currentAttestation,
  addAttestation,
  attestedValuesByPlatform,
  attestedEmails,
  hasExpired,
};
