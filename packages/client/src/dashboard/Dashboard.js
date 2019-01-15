import React from 'react';
import styled from 'styled-components';
import { colors } from '../app/theme';
import Nav from './Nav';
import Sidenav from './Sidenav';
import DashboardRoutes from './DashboardRoutes';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
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
  font-size: 2.6rem;
`;

const ContentContainer = styled.div`
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <LogoContainer>
        <Logo>uSocial</Logo>
      </LogoContainer>
      <Nav />
      <Sidenav />
      <ContentContainer>
        <DashboardRoutes />
      </ContentContainer>
    </DashboardContainer>
  );
}

export default Dashboard;
