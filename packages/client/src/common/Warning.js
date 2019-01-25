import React from 'react';
import styled from 'styled-components';
import { colors, spaces } from '../app/theme';
import { useLocalStorage } from '../utils/react-context';

const WarningContainer = styled.div`
  position: relative;
  background-color: #ffffcc;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: ${spaces.section};
`;

const Close = styled.a`
  color: ${colors.textDefault};
  position: absolute;
  top: 0;
  right: 0;
  padding: 2rem;
  float: right;
`;

function Warning({ id, children }) {
  const [show, setShow] = useLocalStorage(`warning-${id}`, true);

  if (!show) {
    return (null);
  }

  return (
    <WarningContainer>
      <Close onClick={() => setShow(false)}>X</Close>
      {children}
    </WarningContainer>
  );
}

export default Warning;
