import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, spaces, sizes } from '../app/theme';
import DefaultButton from '../common/DefaultButton';
import HorizontalSpacer from '../common/HorizontalSpacer';
import { SidenavContext } from './SidenavProvider';
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

  @media (max-width: ${sizes.mobileSidenav}) {
    padding: ${spaces.default};
  }
`;

const MenuIcon = styled.a`
  color: ${colors.textDefault};
  padding: 1rem 1rem 1rem 0; // Make the clicking area bigger on mobile
  display: none;

  @media (max-width: ${sizes.mobileSidenav}) {
    display: inline;
  }
`;

const ConnectLink = styled(Link)`
  margin-left: auto;
`;

const ConnectButton = styled(DefaultButton)`
`;

function Nav() {
  const sidenavContext = useContext(SidenavContext);

  function toggleSidenav() {
    sidenavContext.setIsMobileVisible(!sidenavContext.isMobileVisible);
  }

  return (
    <NavContainer>
      <MenuIcon className="fas fa-bars" onClick={toggleSidenav}></MenuIcon>
      <ConnectLink to="/dashboard/connect">
        <ConnectButton>Connect</ConnectButton>
      </ConnectLink>
      <HorizontalSpacer />
      <AvatarCard />
    </NavContainer>
  );
}

export default Nav;
