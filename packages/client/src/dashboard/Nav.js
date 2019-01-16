import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, spaces } from '../app/theme';
import DefaultButton from '../common/DefaultButton';
import HorizontalSpacer from '../common/HorizontalSpacer';
import AvatarCard from './AvatarCard';

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.separator};
  padding: ${spaces.default};
`;

const ConnectLink = styled(Link)`
  margin-left: auto;
`;

const ConnectButton = styled(DefaultButton)`
`;

function Nav() {
  return (
    <NavContainer>
      <ConnectLink to="/dashboard/connect">
        <ConnectButton>Connect</ConnectButton>
      </ConnectLink>
      <HorizontalSpacer />
      <AvatarCard />
    </NavContainer>
  );
}

export default Nav;
