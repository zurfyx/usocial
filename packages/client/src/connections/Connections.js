import React from 'react';
import styled from 'styled-components';
import MaxWidth from '../common/MaxWidth';
import DefaultButton from '../common/DefaultButton';
import DefaultInput from '../common/DefaultInput';
import { colors, spaces } from '../app/theme';

const ConnectionsContainer = styled(MaxWidth)`
  padding: ${spaces.section};
`;

const ChooseContainer = styled.div`
  padding: ${spaces.default};
  text-align: center;
`;

const SocialOption = styled(DefaultButton)`
  font-weight: 400;
  color: #4c4c4c;
  border: 1px solid #ddd;
  border-radius: 25px;
  background-color: #fff;
  width: 160px;

  & + & {
    margin-left: 2rem;
  }
`;

const SocialName = styled.span`
  margin-left: 1.2rem;
`;

const Section = styled.section`
  margin-bottom: 6rem;
`;

const SectionHeader1 = styled.h1`
  padding-bottom: 1.2rem;
  border-bottom: 1px solid ${colors.separator};
`;

const SectionHeader2 = styled.h2`
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.separator};
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
            <i className="fas fa-envelope-open" aria-hidden="true"></i>
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