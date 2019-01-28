import React from 'react';
import styled from 'styled-components';
import { colors, sizes } from '../app/theme';
import BoxListItem from '../common/BoxListItem';
import KeyValue from '../common/KeyValue';

const ISS_DID = process.env.REACT_APP_UPORT_DID;

const PLATFORMS = {
  facebook: {
    fa: 'fab fa-facebook',
  },
  google: {
    fa: 'fab fa-google',
  },
  twitter: {
    fa: 'fab fa-twitter',
  },
  email: {
    fa: 'fas fa-envelope',
  },
  unknown: {
    fa: 'fas fa-question',
  }
};

const Item = styled(BoxListItem)`
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-column-gap: 3rem;

  @media (max-width: ${sizes.phablet}) {
    grid-template-columns: 1fr;
  }
`;

const ItemIconContainer = styled.div`
  grid-row: 1 / span 2;
  justify-self: center;
`;

const ItemIcon = styled.i`
  color: #666;
  background-color: ${colors.backgroundLight};
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 999px;
  text-align: center;
  width: 46px;
  height: 46px;
`;

const ItemValue = styled.span`
  font-size: 2.5rem;
  color: ${colors.textHeader};
`;

const ConnectionsKeyValue = styled(KeyValue)`
  grid-template-columns: 85px 1fr;
`;

function AttestationItem({
  platform,
  value,
  iat,
  exp,
  iss,
  sub,
  jwt,
 }) {
  const platformInfo = PLATFORMS[platform] || PLATFORMS.unknown;

  return (
    <Item>
      <ItemIconContainer>
        <ItemIcon className={platformInfo.fa} aria-hidden="true"></ItemIcon>
      </ItemIconContainer>
      <ItemValue>{value}</ItemValue>
      <ConnectionsKeyValue>
        <dt>Claim</dt>
        <dd>{platform}</dd>
        <dt>Expedited</dt>
        <dd>{new Date(iat * 1e3).toLocaleDateString()}</dd>
        <dt>Expires</dt>
        <dd>{new Date(exp * 1e3).toLocaleDateString()}</dd>
        <dt>Issuer</dt>
        <dd>{iss}</dd>
        <dt>Receiver</dt>
        <dd>{sub}</dd>
        <dt>JWT</dt>
        <dd>{jwt}</dd>
      </ConnectionsKeyValue>
    </Item>
  );
}

const ItemSpan = styled.p`
  grid-column: 1 / span 2;
`;

function DidMismatch(attestation) {
  const expected = ISS_DID;
  const received = attestation.iss;
  return (
    <Item>
      <ItemSpan>
        DID mismatch. This attestation was not created by Usocial Identity.
        <p>Expected: ${expected}</p>
        <p>Received: ${received}</p>
      </ItemSpan>
    </Item>
  );
}

function Malformed() {
  return (
    <Item>
      <ItemSpan>
        Malformed attestation.
      </ItemSpan>
    </Item>
  );
}

export {
  Malformed,
  DidMismatch,
};
export default AttestationItem;
