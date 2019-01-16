import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';
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

function Dashboard({ context, history }) {
  if (_.isEmpty(context.user)) {
    history.push('/');
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

const connected = connect(UserContext.Consumer, Dashboard);
const routered = withRouter(connected);

export default routered;
