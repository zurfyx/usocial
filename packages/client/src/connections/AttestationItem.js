import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';
import { colors, sizes } from '../app/theme';
import BoxListItem from '../common/BoxListItem';
import KeyValue from '../common/KeyValue';
import { securityParams, UserContext } from '../app/UserProvider';

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

const ErrorItem = styled.div`
  padding: 1.5rem;
`;

function DidMismatch({ attestation }) {
  const userContext = useContext(UserContext);
  const params = securityParams(userContext);
  
  const expectedIss = params.iss;
  const receivedIss = attestation.iss;
  const IssMismatch = () => (
    <Fragment>
      DID mismatch. This attestation was not created by Usocial Identity.
      <KeyValue>
        <dt>Expected ISS</dt>
        <dd>${expectedIss}</dd>
        <dt>Received ISS</dt>
        <dd>${receivedIss}</dd>
      </KeyValue>
    </Fragment>
  );

  const expectedSub = params.sub;
  const receivedSub = attestation.sub;
  const SubMismatch = () => (
    <Fragment>
      SUB mismatch. This attestation does not belong to you.
      <KeyValue>
        <dt>Expected SUB</dt>
        <dd>${expectedSub}</dd>
        <dt>Received SUB</dt>
        <dd>${receivedSub}</dd>
      </KeyValue>
    </Fragment>
  );

  return (
    <ErrorItem>
      {expectedIss !== receivedIss && <IssMismatch />}
      {expectedSub !== receivedSub && <SubMismatch />}
    </ErrorItem>
  );
}

function Malformed() {
  return (
    <ErrorItem>Malformed attestation.</ErrorItem>
  );
}

function Expired({ attestation }) {
  const { exp } = attestation;
  return (
    <ErrorItem>
      <p>Attestation marked as invalid by uPort (Expired).</p>
      <KeyValue>
        <dt>Expiration date</dt>
        <dd>{new Date(exp * 1e3).toLocaleDateString()}</dd>
      </KeyValue>
    </ErrorItem>
  );
}

function Invalid() {
  return (
    <ErrorItem>Attestation marked as invalid by uPort.</ErrorItem>
  );
}

export {
  Malformed,
  DidMismatch,
  Expired,
  Invalid,
};
export default AttestationItem;
