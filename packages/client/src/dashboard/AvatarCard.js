import React from 'react';
import styled from 'styled-components';
import { connect } from '../utils/react-context';
import { UserContext } from '../UserProvider';
import { spaces } from '../theme';

const AvatarCardContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${spaces.default};
`;

const Name = styled.span`
  font-size: 1.6rem;
`;

const Avatar = styled.img`
  grid-row-end: span 2;
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
  return (
    <AvatarCardContainer>
      <Name>{shortName(context.user.name)}</Name>
      <Avatar src={context.user.avatar && context.user.avatar.uri} />
      <ConnectionsText>5 connections</ConnectionsText>
    </AvatarCardContainer>
  );
}

export default connect(UserContext.Consumer, AvatarCard);
