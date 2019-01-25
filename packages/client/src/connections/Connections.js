import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from '../utils/react-context';
import Section from '../common/Section';
import SectionHeader1 from '../common/SectionHeader1';
import BoxList from '../common/BoxList';
import MaxWidth from '../common/MaxWidth';
import ToolBox from '../common/ToolBox';
import BoxListItem from '../common/BoxListItem';
import DefaultButton from '../common/DefaultButton';
import RefreshTool from '../shared/RefreshTool';
import { UserContext } from '../app/UserProvider';
import { spaces } from '../app/theme';
import ConnectionsItem from './ConnectionsItem';

const ConnectionsContainer = styled(MaxWidth)`
  padding: ${spaces.section};
`;

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

  return (
    <ConnectionsContainer>
      <ToolBox>
        <RefreshTool />
      </ToolBox>
      <Section>
        <SectionHeader1 border={false}>Connections</SectionHeader1>
        <BoxList>
          {verified.length === 0 && (
            <NoConnections>
              No connections found.
              <Link to="/dashboard/connect"><ConnectButton>Connect</ConnectButton></Link>
            </NoConnections>
          )}
          {verified && verified.map((verifiedItem) => (
            <ConnectionsItem key={verifiedItem.jwt} verifiedItem={verifiedItem} />
          ))}
        </BoxList>
      </Section>
    </ConnectionsContainer>
  );
}

export default connect('user', UserContext.Consumer, Connections);
