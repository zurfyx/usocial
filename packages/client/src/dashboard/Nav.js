import React from 'react';
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

const ConnectButton = styled(DefaultButton)`
  background-color: ${colors.backgroundAlternative};
  margin-left: auto;
`;

function Nav() {
  return (
    <NavContainer>
      <span>Connections</span>
      <ConnectButton>
        Connect
      </ConnectButton>
      <HorizontalSpacer />
      <AvatarCard />
    </NavContainer>
  );
}

export default Nav;
