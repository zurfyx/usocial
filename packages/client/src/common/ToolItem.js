import styled from 'styled-components';
import { colors } from '../app/theme';

const ToolItem = styled.a`
  color: ${colors.textHeader};

  :first-of-type {
    margin-left: auto;
  }

  & + & {
    border-left: 1px solid ${colors.separator};
    padding-left: 2rem;
    margin-left: 2rem;
  }
`;

export default ToolItem;
