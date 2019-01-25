import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, spaces } from '../app/theme';
import DefaultButton from '../common/DefaultButton';
import HorizontalSpacer from '../common/HorizontalSpacer';
import AvatarCard from './AvatarCard';

const NavContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  padding: ${spaces.default} ${spaces.default} ${spaces.default} calc(200px + ${spaces.default});
  border-bottom: 1px solid ${colors.separator};
  background-color: ${colors.background};
  z-index: 2;
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
