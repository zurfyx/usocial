import styled from 'styled-components';
import { colors } from '../theme';

const HorizontalSpacer = styled.div`
  display: block;
  padding-left: 1.5rem;
  margin-left: 1.5rem;
  border-left: 1px solid ${colors.separator};
  height: 100%;
`;

export default HorizontalSpacer;
