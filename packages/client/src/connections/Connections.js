import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { sortAttestations, currentAttestation } from 'usocial';
import { connect } from '../utils/react-context';
import Section from '../common/Section';
import SectionHeader1 from '../common/SectionHeader1';
import ToolBox from '../common/ToolBox';
import BoxListItem from '../common/BoxListItem';
import DefaultButton from '../common/DefaultButton';
import Warning from '../common/Warning';
import BoxList from '../common/BoxList';
import SyncTool from '../shared/SyncTool';
import { UserContext, securityParams } from '../app/UserProvider';
import DashboardPage from '../dashboard/DashboardPage';
import Attestation from './Attestation';

const NoConnections = styled(BoxListItem)`
  padding: 4.2rem;
  text-align: center;
`;

const ConnectButton = styled(DefaultButton)`
  display: block;
  margin: 2rem auto;
`;

function Connections({ user }) {
  const verified = user.user.verified;
  const invalid = user.user.invalid;
  const attestations = sortAttestations([].concat(verified, invalid));
  const current = currentAttestation(verified, securityParams(user));

  return (
    <DashboardPage>
      <ToolBox>
        <SyncTool />
      </ToolBox>
      <Warning id="new-connection">
        If you have added a connection recently, you may have to click on the SYNCHRONISE link above
        to view the latest version of your uPort mobile app attestations.
      </Warning>
      <Section>
        <SectionHeader1 border={false}>Connections</SectionHeader1>
        {attestations.length === 0 && (
          <BoxList>
            <NoConnections>
              No connections found.
              <Link to="/dashboard/connect"><ConnectButton>Connect</ConnectButton></Link>
            </NoConnections>
          </BoxList>
        )}
        {attestations && attestations.map((attestation, i) => (
          <Fragment key={attestation.jwt || attestation}>
            <h2>{`#${i + 1}${current && attestation.jwt === current.jwt ? ' (Current)' : ''}`}</h2>
            <Attestation attestation={attestation} isInvalid={invalid.includes(attestation)} />
          </Fragment>
        ))}
      </Section>
    </DashboardPage>
  );
}

export default connect('user', UserContext.Consumer, Connections);
