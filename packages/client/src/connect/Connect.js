import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Section from '../common/Section';
import SectionHeader1 from '../common/SectionHeader1';
import { spaces } from '../app/theme';
import TransparentRoundedButton from '../common/TransparentRoundedButton';
import DashboardPage from '../dashboard/DashboardPage';
import ConnectFacebook from './ConnectFacebook';
import ConnectGoogle from './ConnectGoogle';
import ConnectTwitter from './ConnectTwitter';
import ConnectEmail from './ConnectEmail';

const PLATFORMS = {
  facebook: {
    name: 'Facebook',
    fa: 'fab fa-facebook',
    next: ConnectFacebook,
  },
  google: {
    name: 'Google',
    fa: 'fab fa-google',
    next: ConnectGoogle,
  },
  twitter: {
    name: 'Twitter',
    fa: 'fab fa-twitter',
    next: ConnectTwitter,
  },
  email: {
    name: 'Email',
    fa: 'fas fa-envelope',
    next: ConnectEmail,
  },
};

const ChooseContainer = styled.div`
  margin-top: -2rem;
  margin-left: -2rem;
  padding: ${spaces.default};
  text-align: center;
`;

const SocialOption = styled(TransparentRoundedButton)`
  margin-left: 2rem;
  margin-top: 2rem;
  width: 160px;
`;

const SocialName = styled.span`
  margin-left: 1.2rem;
`;

function Connections({ history }) {
  return (
    <DashboardPage>
      <Section>
        <SectionHeader1>Connect</SectionHeader1>
        <ChooseContainer>
          {Object.entries(PLATFORMS).map(([key, value]) => (
            <SocialOption key={key} onClick={() => history.push(`/dashboard/connect/${key}`)}>
              <i className={value.fa} aria-hidden="true" />
              <SocialName>{value.name}</SocialName>
            </SocialOption>
          ))}
        </ChooseContainer>
      </Section>
      <Switch>
        {Object.entries(PLATFORMS).map(([key, value]) => (
          <Route key={key} path={`/dashboard/connect/${key}`} exact component={value.next}></Route>
        ))}
      </Switch>
    </DashboardPage>
  );
}

export default withRouter(Connections);