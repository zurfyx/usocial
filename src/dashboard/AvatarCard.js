import React from 'react';
import styled from 'styled-components';
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

function AvatarCard() {
  return (
    <AvatarCardContainer>
      <Name>Patricia</Name>
      <Avatar src="https://secure.gravatar.com/avatar/4c25a536476ee30f222667d3b812811a" />
      <ConnectionsText>5 connections</ConnectionsText>
    </AvatarCardContainer>
  );
}

export default AvatarCard;
