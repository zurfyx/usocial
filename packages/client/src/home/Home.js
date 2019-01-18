import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { connect } from '../utils/react-context';
import MaxWidth from '../common/MaxWidth';
import ExternalLink from '../common/ExternalLink';
import ScreenReader from '../common/ScreenReader';
import { UserContext } from '../app/UserProvider';
import Authenticate from './Authenticate';

const HomeContainer = styled.div`
  height: 100vh;
  padding: 1.5rem;
  background: #36d1dc;
  background: -webkit-linear-gradient(to top, #36d1dc, #5b86e5);
  background: linear-gradient(to top, #36d1dc, #5b86e5);
`;

const HomeContent = styled(MaxWidth)`
  display: flex;
  flex-direction: column;
  height: 66%;
  color: #f4f4f4;

  a {
    color: #f4f4f4;
  }
`;

const HomeDescription = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.header`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: 1.5em;
`;

const Logo = styled.a`
`;

const GithubLogo = styled(ExternalLink)`
  float: right;
`;

const Headline = styled.h1`
  color: #f4f4f4;
  font-size: 5rem;
  font-weight: 400;
  max-width: 540px;
`;

const SubHeadline = styled.h3`
  color: #f4f4f4;
  margin-top: 0;
  margin-bottom: 3rem;
`;

const ROTATE_PLATFORM = [
  'Facebook',
  'Google',
  'Twitter',
  'an Email',
];

function Home({ context, history }) {
  const [platform, setPlatform] = useState(ROTATE_PLATFORM[0]);
  useEffect(() => {
    const interval = window.setInterval(() => {
      ROTATE_PLATFORM.push(ROTATE_PLATFORM.shift());
      setPlatform(ROTATE_PLATFORM[0]);
    }, 2.5e3);
    return () => clearInterval(interval);
  }, []);

  if (!isEmpty(context.user)) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <HomeContainer>
      <HomeContent>
        <Header>
          <Logo href="/">uSocial</Logo>
          <GithubLogo href="https://github.com/zurfyx/usocial">
            <ScreenReader>GitHub</ScreenReader>
            <i className="fab fa-github" aria-hidden="true"></i>
          </GithubLogo>
        </Header>
        <HomeDescription>
          <Headline>Your Social Identities on the Decentralized Web</Headline>
          <SubHeadline>Link <b>{platform}</b> to your uPort account</SubHeadline>
          <Authenticate></Authenticate>
        </HomeDescription>
      </HomeContent>
    </HomeContainer>
  );
}

export default connect(UserContext.Consumer, Home);
