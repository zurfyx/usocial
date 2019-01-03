import styled from 'styled-components';

const ScreenReader = styled.span`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export default ScreenReader;
