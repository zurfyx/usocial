import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from '../utils/react-context';
import MaxWidth from '../common/MaxWidth';
import Section from '../common/Section';
import SectionHeader1 from '../common/SectionHeader1';
import Box from '../common/Box';
import BoxMultilineHeader from '../common/BoxMultilineHeader';
import KeyValue from '../common/KeyValue';
import ToolBox from '../common/ToolBox';
import ToolItem from '../common/ToolItem';
import RefreshTool from '../shared/RefreshTool';
import { spaces } from '../app/theme';
import { UserContext, signout } from '../app/UserProvider';

const ProfileContainer = styled(MaxWidth)`
  padding: ${spaces.section};
`;

function Profile({ user }) {

  return (
    <ProfileContainer>
      <ToolBox>
        <RefreshTool />
        <ToolItem onClick={() => signout(user)}>
          Sign out  <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
        </ToolItem>
      </ToolBox>
      <Section>
        <SectionHeader1 border={false}>Profile</SectionHeader1>
        <Box>
          <BoxMultilineHeader>
            <h2>General</h2>
            Your basic account information.
          </BoxMultilineHeader>
          <KeyValue>
            <dt>Name</dt>
            <dd>{user.user.name}</dd>
            <dt>Email</dt>
            <dd>{user.user.email}</dd>
            <dt>Avatar</dt>
            <dd>{user.user.avatar && <AvatarDetail uri={user.user.avatar.uri} />}</dd>
          </KeyValue>
        </Box>
        <Box>
          <BoxMultilineHeader>
            <h2>uPort</h2>
            Your uPort identifiers, tokens, ethereum addresses, public keys and tokens. Note that
            your private keys never leave your phone wallet.
          </BoxMultilineHeader>
          <KeyValue>
            <dt>Address</dt>
            <dd>{user.user.address}</dd>
            <dt>BoxPub</dt>
            <dd>{user.user.boxPub}</dd>
            <dt>DID</dt>
            <dd>{user.user.did}</dd>
            <dt>MNID</dt>
            <dd>{user.user.mnid}</dd>
            <dt>PublicEncKey</dt>
            <dd>{user.user.publicEncKey}</dd>
            <dt>PushToken</dt>
            <dd>{user.user.pushToken}</dd>
          </KeyValue>
        </Box>
      </Section>
    </ProfileContainer>
  );
}

const Avatar = styled.img`
  display: block;
  height: 80px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

function AvatarDetail({ uri }) {
  return (
    <Fragment>
      {uri}
      <Avatar src={uri} />
    </Fragment>
  );
}

export default connect('user', UserContext.Consumer, Profile);
