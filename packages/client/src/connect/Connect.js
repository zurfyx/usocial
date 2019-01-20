import React, { useState } from 'react';
import styled from 'styled-components';
import MaxWidth from '../common/MaxWidth';
import Section from '../common/Section';
import SectionHeader1 from '../common/SectionHeader1';
import { spaces } from '../app/theme';
import TransparentRoundedButton from '../common/TransparentRoundedButton';
import ConnectEmail from './ConnectEmail';

const PLATFORMS = {
  facebook: {
    name: 'Facebook',
    fa: 'fab fa-facebook',
    next: () => '',
  },
  google: {
    name: 'Google',
    fa: 'fab fa-google',
    next: () => '',
  },
  twitter: {
    name: 'Twitter',
    fa: 'fab fa-twitter',
    next: () => '',
  },
  email: {
    name: 'Email',
    fa: 'fas fa-envelope',
    next: ConnectEmail,
  },
};

const ConnectionsContainer = styled(MaxWidth)`
  padding: ${spaces.section};
`;

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

function Connections() {
  const [option, setOption] = useState(null);

  return (
    <ConnectionsContainer>
      <Section>
        <SectionHeader1>Connect</SectionHeader1>
        <ChooseContainer>
          {Object.entries(PLATFORMS).map(([key, value]) => (
            <SocialOption key={key} onClick={() => setOption(key)}>
              <i className={value.fa} aria-hidden="true" />
              <SocialName>{value.name}</SocialName>
            </SocialOption>
          ))}
        </ChooseContainer>
      </Section>
      {option && PLATFORMS[option].next()}
    </ConnectionsContainer>
  );
}

export default Connections;