import React from 'react';
import styled from 'styled-components';
import MaxWidth from './MaxWidth';
import ExternalLink from './ExternalLink';
import ScreenReader from './ScreenReader';

const HomeContainer = styled.div`
  height: 100vh;
  padding: 1.5rem;
  background: #36d1dc;
  background: -webkit-linear-gradient(to top, #36d1dc, #5b86e5);
  background: linear-gradient(to top, #36d1dc, #5b86e5);;
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
  font-size: 2.5em;
  max-width: 550px;
`;

const SubHeadline = styled.span`
  margin-bottom: 3rem;
`;

const GetStarted = styled.button`
  color: #4663ac;
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 1.5rem 4rem;
`;

function Home() {
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
          <SubHeadline>Link Facebook to your uPort account</SubHeadline>
          <GetStarted>Get started</GetStarted>
        </HomeDescription>
      </HomeContent>
    </HomeContainer>
  );
}

export default Home;