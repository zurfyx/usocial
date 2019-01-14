import React from 'react';
import styled from 'styled-components';
import { colors } from '../app/theme';
import Nav from './Nav';
import Sidenav from './Sidenav';
import Connections from '../connections/Connections';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 210px 1fr;
  grid-template-rows: 60px 1fr;
  height: 100vh;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundDark};
`;

const Logo = styled.span`
  display: inline-block;
  color: ${colors.textContrast};
  font-weight: 600;
  font-size: 2.5rem;
`;

const ContentContainer = styled.div`
  background-color: #fff;
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <LogoContainer>
        <Logo>usocial</Logo>
      </LogoContainer>
      <Nav />
      <Sidenav />
      <ContentContainer>
        <Connections />
      </ContentContainer>
    </DashboardContainer>
  );
}

export default Dashboard;
