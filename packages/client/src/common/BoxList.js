import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import NeatList from './NeatList';

const BoxListContainer = styled(Box)`
  padding: 0;
`;

const List = styled(NeatList)`
  margin: 0;
`

function BoxList(props) {
  return (
    <BoxListContainer>
      <List>{props.children}</List>
    </BoxListContainer>
  );
}

export default BoxList;
