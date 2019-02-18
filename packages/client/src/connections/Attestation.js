import React, { useContext } from 'react';
import BoxList from '../common/BoxList';
import {
  validateAttestation,
  verifyAttestation,
} from 'usocial';
import { UserContext, securityParams } from '../app/UserProvider';
import AttestationItem, { Malformed, DidMismatch, Invalid } from './AttestationItem';

function Attestation({ attestation, isInvalid }) {
  const userContext = useContext(UserContext);

  if (isInvalid) {
    return <BoxList><Invalid /></BoxList>;
  }
  if (!validateAttestation(attestation)) {
    return <BoxList><Malformed /></BoxList>;
  }
  if (!verifyAttestation(attestation, securityParams(userContext))) {
    return <BoxList><DidMismatch attestation={attestation} /></BoxList>;
  }

  const usocialClaim = attestation.claim.usocialIdentity;
  return (
    <BoxList>
      {Object.entries(usocialClaim).map(([platform, values]) => {
        return values.map((value) => {
          const itemProps = {
            platform,
            value,
            iat: attestation.iat,
            exp: attestation.exp,
            iss: attestation.iss,
            sub: attestation.sub,
            jwt: attestation.jwt,
          };
          return <AttestationItem key={`${platform}-${value}`} {...itemProps}>{platform}</AttestationItem>
        });
      })}
    </BoxList>
  );
}

export default Attestation;