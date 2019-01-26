import React, { useContext } from 'react';
import styled from 'styled-components';
import NeatList from '../common/NeatList';
import NeatNavLink from '../common/NeatNavLink';
import { colors, spaces, sizes } from '../app/theme';
import { SidenavContext } from './SidenavProvider';

const SidenavContainer = styled.div`
  position: fixed;
  top: 0;
  width: 200px;
  background-color: ${colors.backgroundDark};
  color: ${colors.textContrast};
  height: 100%;
  z-index: 3;

  @media (max-width: ${sizes.mobileSidenav}) {
    width: 100%;
    display: ${props => props.isMobileVisible ? 'inline' : 'none'};
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  background-color: ${colors.backgroundDark};
`;

const Logo = styled.span`
  display: inline-block;
  color: ${colors.textContrast};
  font-weight: 600;
  font-size: 2.6rem;
`;

const Network = styled.span`
  display: block;
  margin-top: 0.5rem;
  padding: ${spaces.default};
`;

const SidenavContent = styled(NeatList)`
  padding: 0 ${spaces.default} ${spaces.default} ${spaces.default};
`;

const NetworkIcon = styled.i`
`;

const Level0Item = styled.h4`
  color: #bac8ff;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1rem;

  &:not(:first-of-type) {
    margin-top: 1.5rem;
  }
`;

const Level1Item = styled.li`
  padding: 0.5rem 1rem;
`;

function Sidenav() {
  const sidenavContext = useContext(SidenavContext);

  return (
    <SidenavContainer isMobileVisible={sidenavContext.isMobileVisible}>
      <LogoContainer>
        <Logo>uSocial</Logo>
      </LogoContainer>
      <Network>
        <NetworkIcon className="fab fa-connectdevelop" aria-hidden="true"></NetworkIcon>{' '}
        Rinkeby
      </Network>
      <SidenavContent>
        <Level0Item>Manage</Level0Item>
        <NeatList>
          <Level1Link to="/dashboard" exact={true} activeClassName="active"><Level1Item>All connections</Level1Item></Level1Link>
          <Level1Item onClick={() => window.alert('Coming soon')}>Integrate</Level1Item>
        </NeatList>
        <Level0Item>Account</Level0Item>
        <NeatList>
          <Level1Link to="/dashboard/profile" activeClassName="active"><Level1Item>Profile</Level1Item></Level1Link>
          <Level1Item onClick={() => window.alert('Coming soon')}>Network</Level1Item>
        </NeatList>
      </SidenavContent>
    </SidenavContainer>
  );
}

const Level1LinkContainer = styled(NeatNavLink)`
  display: block;
  color: ${colors.textContrast};
  border-radius: 5px;

  &.active {
    color: #333;
    background-color: #b5d2f1;
  }
`;

function Level1Link(props) {
  const sidenavContext = useContext(SidenavContext);

  return (
    <Level1LinkContainer {...props} onClick={() => sidenavContext.setIsMobileVisible(false)} />
  );
}

export default Sidenav;
