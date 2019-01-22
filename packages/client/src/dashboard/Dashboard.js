import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { connect } from '../utils/react-context';
import { UserContext } from '../app/UserProvider';
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

function Dashboard({ user }) {
  if (isEmpty(user.user)) {
    return <Redirect to="/" />;
  }

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

export default connect('user', UserContext.Consumer, Dashboard);
