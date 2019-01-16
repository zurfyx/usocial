import React from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Sidenav from './Sidenav';
import DashboardRoutes from './DashboardRoutes';

const DashboardContainer = styled.div`
  height: 100vh;
`;

const ContentContainer = styled.div`
  margin-top: 60px;
  margin-left: 200px;
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <Nav />
      <Sidenav />
      <ContentContainer>
        <DashboardRoutes />
      </ContentContainer>
    </DashboardContainer>
  );
}

export default Dashboard;
