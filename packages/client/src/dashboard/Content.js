import React from 'react';
import styled from 'styled-components';
import DashboardRoutes from './DashboardRoutes';
import { sizes } from '../app/theme';

const ContentContainer = styled.div`
  margin-top: 60px;
  margin-left: 200px;

  @media (max-width: ${sizes.mobileSidenav}) {
    margin-left: 0;
  }
`;

function Content() {
  return (
    <ContentContainer>
      <DashboardRoutes />
    </ContentContainer>
  );
}

export default Content;
