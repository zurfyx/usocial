import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { connect } from '../utils/react-context';
import { UserContext } from '../app/UserProvider';
import Nav from './Nav';
import Sidenav from './Sidenav';
import Content from './Content';
import SidenavProvider from './SidenavProvider';

const DashboardContainer = styled.div`
  height: 100vh;
`;

function Dashboard({ user }) {
  if (isEmpty(user.user)) {
    return <Redirect to="/" />;
  }

  return (
    <SidenavProvider>
      <DashboardContainer>
        <Nav />
        <Sidenav />
        <Content />
      </DashboardContainer>
    </SidenavProvider>
  );
}

export default connect('user', UserContext.Consumer, Dashboard);
