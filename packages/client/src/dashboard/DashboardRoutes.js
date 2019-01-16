import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Connections from '../connections/Connections';
import Connect from '../connect/Connect';
import Profile from '../profile/Profile';

function DashboardRoutes() {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Connections} />
      <Route exact path="/dashboard/connect" component={Connect} />
      <Route path="/dashboard/profile" component={Profile} />
    </Switch>
  );
}

export default DashboardRoutes;
