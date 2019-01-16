import React from 'react';
import styled from 'styled-components';
import { connect } from '../utils/react-context';
import Section from '../common/Section';
import SectionHeader1 from '../common/SectionHeader1';
import BoxList from '../common/BoxList';
import MaxWidth from '../common/MaxWidth';
import { UserContext } from '../app/UserProvider';
import { spaces } from '../app/theme';
import ConnectionsItem from './ConnectionsItem';

const ConnectionsContainer = styled(MaxWidth)`
  padding: ${spaces.default};
`;

function Connections({ context }) {
  return (
    <ConnectionsContainer>
      <Section>
        <SectionHeader1 border={false}>Connections</SectionHeader1>
        <BoxList>
          {context.user.verified && context.user.verified.map((verifiedItem) => (
            <ConnectionsItem key={verifiedItem.jwt} verifiedItem={verifiedItem} />
          ))}
        </BoxList>
      </Section>
    </ConnectionsContainer>
  );
}

export default connect(UserContext.Consumer, Connections);
