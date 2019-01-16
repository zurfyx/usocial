import React from 'react';
import styled from 'styled-components';
import MaxWidth from '../common/MaxWidth';
import DefaultButton from '../common/DefaultButton';
import DefaultInput from '../common/DefaultInput';
import Section from '../common/Section';
import SectionHeader1 from '../common/SectionHeader1';
import SectionHeader2 from '../common/SectionHeader2';
import { spaces } from '../app/theme';
import TransparentRoundedButton from '../common/TransparentRoundedButton';

const ConnectionsContainer = styled(MaxWidth)`
  padding: ${spaces.section};
`;

const ChooseContainer = styled.div`
  padding: ${spaces.default};
  text-align: center;
`;

const SocialOption = styled(TransparentRoundedButton)`
  width: 160px;

  & + & {
    margin-left: 2rem;
  }
`;

const SocialName = styled.span`
  margin-left: 1.2rem;
`;

const Instructions = styled.p`
  margin-bottom: 2rem;
`;

const EmailForm = styled.form`
  display: flex;
`;

const EmailInput = styled(DefaultInput)`
  margin-right: 0.5rem;
  width: 400px;
`;

function Connections() {
  return (
    <ConnectionsContainer>
      <Section>
        <SectionHeader1>Connect</SectionHeader1>
        <ChooseContainer>
          <SocialOption>
            <i className="fab fa-facebook" aria-hidden="true"></i>
            <SocialName>Facebook</SocialName>
          </SocialOption>
          <SocialOption>
            <i className="fab fa-google" aria-hidden="true"></i>
            <SocialName>Google</SocialName>
          </SocialOption>
          <SocialOption>
            <i className="fab fa-twitter" aria-hidden="true"></i>
            <SocialName>Twitter</SocialName>
          </SocialOption>
          <SocialOption>
            <i className="fas fa-envelope" aria-hidden="true"></i>
            <SocialName>Email</SocialName>
          </SocialOption>
        </ChooseContainer>
      </Section>
      <Section>
        <SectionHeader2>Choose what to import</SectionHeader2>
        <Instructions>
          A verification QR code will be sent to indicated email address.
        </Instructions>
        <EmailForm>
          <EmailInput type="text" placeholder="Email address" />
          <DefaultButton>Connect</DefaultButton>
        </EmailForm>
      </Section>
    </ConnectionsContainer>
  );
}

export default Connections;