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
  border-radius: 999px;
`;

const ConnectionsText = styled.span`
  font-size: 1.2rem;
`;

function shortName(name) {
  return name && name.split(' ')[0];
}

function AvatarCard({ context }) {
  const { user } = context;
  return (
    <AvatarCardContainer>
      <NeatLink to="/dashboard/profile">
        <Name>{shortName(user.name)}</Name>
      </NeatLink>
      <AvatarLink to="/dashboard/profile">
        <Avatar src={user.avatar && user.avatar.uri} />
      </AvatarLink>
      <ConnectionsText>{user.verified ? user.verified.length : 0} connections</ConnectionsText>
    </AvatarCardContainer>
  );
}

export default connect(UserContext.Consumer, AvatarCard);
