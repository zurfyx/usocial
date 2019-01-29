import React from 'react';
import styled from 'styled-components';
import { connect } from '../utils/react-context';
import { UserContext } from '../app/UserProvider';
import { spaces } from '../app/theme';
import NeatLink from '../common/NeatLink';

const AvatarCardContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${spaces.default};
`;

const Name = styled.span`
`;

const AvatarLink = styled(NeatLink)`
  grid-row-end: span 2;
`

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 999px;
`;

const ConnectionsLink = styled(NeatLink)`
  font-size: 1.2rem;
`;

function shortName(name) {
  return name && name.split(' ')[0];
}

function AvatarCard({ user }) {
  return (
    <AvatarCardContainer>
      <NeatLink to="/dashboard/profile">
        <Name>{shortName(user.user.name)}</Name>
      </NeatLink>
      <AvatarLink to="/dashboard/profile">
        <Avatar src={user.user.avatar && user.user.avatar.uri} />
      </AvatarLink>
      <ConnectionsLink to="/dashboard">
        {user.user.verified ? user.user.verified.length : 0} connections
      </ConnectionsLink>
    </AvatarCardContainer>
  );
}

export default connect('user', UserContext.Consumer, AvatarCard);
