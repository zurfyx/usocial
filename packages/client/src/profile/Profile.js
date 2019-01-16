import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from '../utils/react-context';
import MaxWidth from '../common/MaxWidth';
import Section from '../common/Section';
import SectionHeader1 from '../common/SectionHeader1';
import Box from '../common/Box';
import BoxMultilineHeader from '../common/BoxMultilineHeader';
import KeyValue from '../common/KeyValue';
import { spaces } from '../app/theme';
import { UserContext } from '../app/UserProvider';

const ProfileContainer = styled(MaxWidth)`
  padding: ${spaces.section};
`;

function Profile({ context }) {
  return (
    <ProfileContainer>
      <Section>
        <SectionHeader1 border={false}>Profile</SectionHeader1>
        <Box>
          <BoxMultilineHeader>
            <h2>General</h2>
            Your basic account information.
          </BoxMultilineHeader>
          <KeyValue>
            <dt>Name</dt>
            <dd>{context.user.name}</dd>
            <dt>Email</dt>
            <dd>{context.user.email}</dd>
            <dt>Avatar</dt>
            <dd>{context.user.avatar && <AvatarDetail uri={context.user.avatar.uri} />}</dd>
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
            <dd>{context.user.address}</dd>
            <dt>BoxPub</dt>
            <dd>{context.user.boxPub}</dd>
            <dt>DID</dt>
            <dd>{context.user.did}</dd>
            <dt>MNID</dt>
            <dd>{context.user.mnid}</dd>
            <dt>PublicEncKey</dt>
            <dd>{context.user.publicEncKey}</dd>
            <dt>PushToken</dt>
            <dd>{context.user.pushToken}</dd>
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

export default connect(UserContext.Consumer, Profile);
